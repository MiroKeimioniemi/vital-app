# Vital App - Junction 2023 Huawei Challenge

## Introduction

The issue with most attempts at gamifying exercise is that they stop working when people get bored of the gameplay. And still, many popular videogames are often very repetitive as well. Vital puts the game first by enabling you to play already established platform games such as Roblox in a whole new way, where the grind in front of a screen is replaced by real exercise. Different types of exercise will improve different attributes of your avatar, allowing you to always return to the game with a stronger, leveled up character simultaneously improving your physical health as well as gameplay. Vital caters for older audiences as well in the form of competing against your past self as well as against your friends' avatars. 

#### Web Application

The web application is currently deployed at [https://vital-app.onrender.com/](https://vital-app.onrender.com/).

#### Roblox Game

The proof of concept Roblox game can be played at [https://www.roblox.com/games/15318754057/Roblox-Fitness-Game](https://www.roblox.com/games/15318754057/Roblox-Fitness-Game).

#### Pitch

The pitch and demo video can be viewed at [https://www.youtube.com/watch?v=wKWXetPiuR8](https://www.youtube.com/watch?v=wKWXetPiuR8).

## Vital App

The general idea of the application is to provide a customizable digital avatar characterized by certain attributes that can be improved by consistent and balanced physical activity and healthier lifestyle in general. By default, it displays a Bitmoji avatar with an estimated increase in life expectancy calculated based on the user's health data from their smart watch, while quantifying the work done to get there by summarizing the cumulative steps, cumulative exercise time, maximum recorded running speed, and latest BMI value. This is the default screen, where swiping left will reveal the user's friends' avatars for interpersonal competition and swiping right will reveal the user's other avatars.

This is done in order to appeal especially to the younger audience, who can add a customizable Roblox character that is displayed with a character level and attributes such as speed, strength, health, and jumping height. These characteristics are directly derived from the health data and modify the appearance of the avatar in-app as well as in-game in real-time. Similar attributes can be calculated for characters from other games and thus the application can easily be extended to other popular platform games such as Minecraft and Fortnite or even into new frontiers with continuous role playing games. This is important especially among the youth since latest trends change fast and the goal is to keep them engaged for at least enough time to build habits around healthier and more active lifestyle.

In the future, the idea would be to make the API accessible to game developers so the application can be integrated with new games. Also the proposed designs for connecting with friends, viewing statistics, and sharing them for example over social media would be implemented.

<img width="758" alt="Vital App UI" src="https://github.com/MiroKeimioniemi/vital-app/assets/65595542/00d06873-5f4c-4483-bc89-31eb59f931f1">

## Architecture

Vital consists of a web application, an API and a custom Roblox game as proof of concept for the integration. The API is responsible for obtaining and processing the data from the smart watch, which will be displayed by the app in the form of life expectancy increase, level and attributes of the avatars. The custom Roblox game receives the values for the avatar attributes and updates the player character accordingly by increasing its speed, jump height and size. The web app is built with React, the API with Python and the custom Roblox game with LUA in Roblox studio.

<img width="758" alt="Vital App architecture" src="https://github.com/MiroKeimioniemi/vital-app/assets/24809517/6380a0f2-3e29-450d-8bdb-e873df7d29d8">

The web application currently has a week indicator and forward button at the bottom right corner, which can be used to simulate the passing of weeks (up to 5) and associated improvement of attributes in an accelerated manner to view how the attributes, life expectancy and level increase with sustained effort over a period of four weeks.

## Running Locally

The Vital app can be run locally following these steps:

1. install dependencies with command ```npm install```
2. run app with command ```npm start```

Also consider that the API for the calculations is likely going to be taken down at some point so you should host it yourself and modify the calls accrodingly. You can use the Roblox code to run the game in Roblox Studio.
