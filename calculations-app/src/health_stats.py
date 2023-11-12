import math

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