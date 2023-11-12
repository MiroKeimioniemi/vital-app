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