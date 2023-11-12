# Vital App - Junction 2023 Huawei Challenge

## Introduction

The issue with most attempts at gamifying exercise is that they stop working when people get bored of the gameplay. And still, many popular videogames are often very repetitive as well. Vital puts the game first by enabling you to play already established platform games such as Roblox in a whole new way, where the grind in front of a screen is replaced by real exercise. Different types of exercise will improve different attributes of your avatar, allowing you to always return to the game with a stronger, leveled up character simultaneously improving your physical health as well as gameplay. Vital caters for older audiences as well in the form of competing against your past self as well as against your friends' avatars. 

## Vital App

The general idea of the application is to provide a customizable digital avatar characterized by certain attributes that can be improved by consistent and balanced physical activity and healthier lifestyle in general. By default, it displays a Bitmoji avatar with an estimated increase in life expectancy calculated based on the user's health data from their smart watch, while quantifying the work done to get there by summarizing the cumulative steps, cumulative exercise time, maximum recorded running speed, and latest BMI value. This is the default screen, where swiping left will reveal the user's friends' avatars for interpersonal competition and swiping right will reveal the user's other avatars.

This is done in order to appeal especially to the younger audience, who can add a customizable Roblox character that is displayed with a character level and attributes such as speed, strength, health, and jumping height. These characteristics are directly derived from the health data and modify the appearance of the avatar in-app as well as in-game in real-time. Similar attributes can be calculated for characters from other games and thus the application can easily be extended to other popular platform games such as Minecraft and Fortnite or even into new frontiers with continuous role playing games. This is important especially among the youth since latest trends change fast and the goal is to keep them engaged for at least enough time to build habits around healthier and more active lifestyle.

In the future, the idea would be to make the API accessible to game developers so the application can be integrated with new games. Also the proposed designs for connecting with friends, viewing statistics, and sharing them for example over social media would be implemented.

## Architecture

Vital consists of a web application, an API and a custom Roblox game as proof of concept for the integration. The API is responsible for obtaining and processing the data from the smart watch, which will be displayed by the app in the form of life expectancy increase, level and attributes of the avatars. The custom Roblox game receives the values for the avatar attributes and updates the player character accordingly by increasing its speed, jump height and size. The web app is built with React, the API with Python and the custom Roblox game with LUA in Roblox studio.

![image](https://github.com/MiroKeimioniemi/vital-app/assets/65757701/cafea448-7488-4015-b643-8af9ffaded58)

