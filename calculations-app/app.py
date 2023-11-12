import azure.functions as func
import json
import pandas as pd
from src.health_stats import le_change
from src.game_stats import stats_change

fitness_df = pd.read_csv('LINK_TO_DATA')
fitness_df['avg_bpm'] = (fitness_df['bpm_low'] + fitness_df['bpm_low']) / 2
avg_fitness_df = fitness_df.groupby('week').agg({
    'bmi': 'mean',
    'sleep': 'mean',
    'sleep_score': 'mean',
    'steps': 'mean',
    'avg_bpm': 'mean'
}).reset_index()

workouts_df = pd.read_csv('LINK_TO_DATA')
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