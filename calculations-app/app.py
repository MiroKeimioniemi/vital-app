import math
import pandas as pd

import azure.functions as func
import json

def calculate_le_change(current_le_change: float, bmi: float, sleep: float, steps: float, light: float, moderate: float, vigorous: float, bpm: float):
    avg_bmi = 21.7
    bmi_effect = -1.5 if abs(avg_bmi - bmi) > 3.2 else 0
    steps_effect = 0.00006 * steps if steps <= 8000 else 0.8
    le_update = 0.0006 * current_le_change + bmi_effect + 0.0001 * sleep + steps_effect + 0.003 * light + 0.004 * moderate + 0.005 * vigorous - 0.001 * bpm
    le_update = max(0, le_update)
    frac, years = math.modf(le_update)
    months = frac * 12
    frac, months = math.modf(months)
    days = round(frac * 30, 0)
    return int(years), int(months), int(days)


workouts_needed = 2
max_ws_score_value = 80

def calculate_workout_score(duration: int, hr_zone: int):
    return min(duration * hr_zone, max_ws_score_value) / (max_ws_score_value * workouts_needed)

def total_workout_score(w_durations: list, hr_zones: list):
    s = 0
    for i in range(len(w_durations)):
        s += calculate_workout_score(w_durations[i], hr_zones[i])
    return min(s, 1)

def calculate_speed(current_speed, zone_3_durations: list):
    TS = total_workout_score(zone_3_durations, [3] * len(zone_3_durations))
    if TS >= 0.25:
        return min(current_speed + 7 * (4/3 * TS - 1/3), 100)
    else:
        return max(current_speed + 7 * (4 * TS - 1), 10)

def calculate_strength(current_strength, zone_2_durations: list):
    TS = total_workout_score([0.8 * d for d in zone_2_durations], [2] * len(zone_2_durations))
    if TS >= 0.25:
        return min(current_strength + 7 * (4/3 * TS - 1/3), 100)
    else:
        return max(current_strength + 7 * (4 * TS - 1), 10)

def calculate_health(current_health, avg_sleep_score: float): 
    TS = 10 * avg_sleep_score
    return min(100, max(10, current_health + 7 * (TS - 50)/100))

def calculate_jump_height(current_jump_height, hr_zones: list, workout_durations: list):
    TS = total_workout_score([0.6 * d for d in workout_durations], hr_zones)
    if TS >= 0.25:
        return min(current_jump_height + 7 * (4/3 * TS - 1/3), 100)
    else:
        return max(current_jump_height + 7 * (4 * TS - 1), 10)
    

def le_change(fitness_data, workout_data, current_le_change):
    light = 0
    moderate = 0
    vigorous = 0
    if not workout_data.empty:
        light = sum(duration for duration, zone in zip(workout_data['duration'].values[0], workout_data['hr_zone'].values[0]) if zone == 1)
        moderate = sum(duration for duration, zone in zip(workout_data['duration'].values[0], workout_data['hr_zone'].values[0]) if zone == 2)
        vigorous = sum(duration for duration, zone in zip(workout_data['duration'].values[0], workout_data['hr_zone'].values[0]) if zone == 3)
    return calculate_le_change(current_le_change,
                               fitness_data['bmi'].values[0],
                               fitness_data['sleep'].values[0],
                               fitness_data['steps'].values[0],
                               light,
                               moderate,
                               vigorous,
                               fitness_data['avg_bpm'].values[0])

def stats_change(fitness_data, workout_data, current_speed, current_strength, current_health, current_jump_height):
    zone_3_durations = []
    zone_2_durations = []
    hr_zones = []
    workout_durations = []
    if not workout_data.empty:
        zone_3_durations = [duration for duration, zone in zip(workout_data['duration'].values[0], workout_data['hr_zone'].values[0]) if zone == 3]
        zone_2_durations = [duration for duration, zone in zip(workout_data['duration'].values[0], workout_data['hr_zone'].values[0]) if zone == 2]
        hr_zones =  workout_data['hr_zone'].values[0]
        workout_durations = workout_data['duration'].values[0]
    speed = calculate_speed(current_speed, zone_3_durations)
    strength = calculate_strength(current_strength, zone_2_durations)
    health = calculate_health(current_health, fitness_data['sleep'].values[0])
    jump_height = calculate_jump_height(current_jump_height, hr_zones, workout_durations)
    return round(speed), round(strength), round(health), round(jump_height)


fitness_df = pd.read_csv('https://rgoccdetstorage.blob.core.windows.net/jc2023/fitness.csv')
fitness_df['avg_bpm'] = (fitness_df['bpm_low'] + fitness_df['bpm_low']) / 2
avg_fitness_df = fitness_df.groupby('week').agg({
    'bmi': 'mean',
    'sleep': 'mean',
    'sleep_score': 'mean',
    'steps': 'mean',
    'avg_bpm': 'mean'
}).reset_index()

workouts_df = pd.read_csv('https://rgoccdetstorage.blob.core.windows.net/jc2023/workouts.csv')
mapping = {1: 1, 2: 2, 3: 2, 4: 3, 5: 3}
workouts_df['hr_zone'] = workouts_df['hr_zone'].map(mapping)
avg_workouts_df = workouts_df.groupby('week').agg({
    'duration': list,
    'hr_zone': list,
    'max_speed': list
}).reset_index()

def main(req: func.HttpRequest) -> func.HttpResponse:
    req_body = req.get_json()
    week = req_body.get('week')
    current_le_change = req_body.get('current_le_change')
    current_speed = req_body.get('current_speed')
    current_strength = req_body.get('current_strength')
    current_health = req_body.get('current_health')
    current_jump_height = req_body.get('current_jump_height')

    '''if not all([week, current_le_change, current_speed, current_strength, current_health, current_jump_height]):
        error_message = {"error": "One or more required fields are missing in the request."}
        return func.HttpResponse(json.dumps(error_message), status_code=400, mimetype="application/json")'''

    avg_fitness_week_df = avg_fitness_df[avg_fitness_df['week'] == week]
    avg_workouts_week_df = avg_workouts_df[avg_workouts_df['week'] == week]

    fitness_weeks_df = fitness_df[fitness_df['week'] <= week]
    workouts_weeks_df = workouts_df[workouts_df['week'] <= week]
    avg_workouts_weeks_df = avg_workouts_df[avg_workouts_df['week'] <= week]

    years, months, days = le_change(avg_fitness_week_df, avg_workouts_week_df, current_le_change)
    speed, strength, health, jump_height = stats_change(avg_fitness_week_df, avg_workouts_week_df, current_speed, current_strength, current_health, current_jump_height)

    total_steps = round(fitness_weeks_df['steps'].sum())
    total_workouts = 0
    if not workouts_weeks_df.empty:
        total_workouts = round(workouts_weeks_df['duration'].sum() / 60)
    max_speed = 0
    if not avg_workouts_weeks_df.empty:
        max_speed = round(max([max(speed_list) for speed_list in avg_workouts_weeks_df['max_speed']]))
    bmi = round(fitness_weeks_df['bmi'].mean())

    response_data = {"life_expectancy": {"years": years, "months": months, "days": days},
                    "health_stats": {"total_steps": total_steps, "total_workouts": total_workouts, "max_speed": max_speed, "bmi": bmi},
                    "game_stats": {"speed": speed, "strength": strength, "health": health, "jump_height": jump_height}}
    response_json = json.dumps(response_data)

    return func.HttpResponse(response_json, mimetype="application/json")