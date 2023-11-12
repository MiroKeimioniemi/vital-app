import { useState, useEffect } from 'react'
import './App.css'

import Carousel from './components/Carousel.jsx'
import { AiFillForward } from "react-icons/ai";

import bitmojiAvatar from './images/bitmoji-avatar.png';
import friendBitmoji from './images/friend-bitmoji.jpeg';
import robloxAvatar from './images/roblox-avatar.png';
import minecraftAvatar from './images/minecraft-avatar.jpg';
import plusSign from './images/plus-sign.svg'
import LeIncrease from './components/LeIncrease'
import getData from './services/getData.js'
import postData from './services/updateRoblox.js'
import StatsCard from './components/StatsCard';


function App() {
  const [selectedItem, setSelectedItem] = useState(2);
  const handleCarouselChange = (index) => {
    setSelectedItem(index);
  };

  const initialAvatars = [
    {name: "Add Friend", image: plusSign, nativeAvatar: true, level: '-', health: '-', strength: '-', speed: '-', jumpHeight: '-', lifeExpectancy: [0, 0, 0], totalSteps: '-', totalExercise: '-', maxSpeed: '-', bmi: '-'},
    {name: "Samantha", image: friendBitmoji, nativeAvatar: true, level: 0, health: 0, strength: 0, speed: 0, jumpHeight: 0, lifeExpectancy: [8, 5, 23], totalSteps: 249485, totalExercise: 2304, maxSpeed: 28, bmi: 21},
    {name: "Jacob", image: bitmojiAvatar, nativeAvatar: true, level: 0, health: 0, strength: 0, speed: 0, jumpHeight: 0, lifeExpectancy: [0, 0, 0], totalSteps: 0, totalExercise: 0, maxSpeed: '-', bmi: '-'},
    {name: "J4c0b (Roblox)", image: robloxAvatar, nativeAvatar: false, level: 10, health: 10, strength: 10, speed: 10, jumpHeight: 10, lifeExpectancy: [0, 0, 0], totalSteps: 10, totalExercise: 10, maxSpeed: 10, bmi: '-'},
    {name: "Jac0b (Minecraft)", image: minecraftAvatar, nativeAvatar: false, level: 10, health: 10, strength: 10, speed: 10, jumpHeight: 10, lifeExpectancy: [0, 0, 0], totalSteps: 10, totalExercise: 10, maxSpeed: 10, bmi: '-'},
    {name: "Add Friend", image: plusSign, nativeAvatar: false, level: '-', health: '-', strength: '-', speed: '-', jumpHeight: '-', lifeExpectancy: [0, 0, 0], totalSteps: '-', totalExercise: '-', maxSpeed: '-', bmi: '-'}
  ]

  const [count, setCount] = useState(1)
  const [avatars, setAvatars] = useState(initialAvatars)

  const [lE, setlE] = useState([0, 0, 0]) // year month day
  const [health, setHealth] = useState(10)
  const [speed, setSpeed] = useState(10)
  const [strength, setStrength] = useState(10)
  const [jumpHeight, setJumpHeight] = useState(10)

  useEffect(() => {
    const robloxData = {
      "speed": speed,
      "jump": jumpHeight,
      "health": health,
      "strength": strength
    }
    postData(robloxData).then((data) => {
      console.log("Roblox server response:")
      console.log(data)
    })
  }, [])

  const handleButtonClick = () => {
    const prevInfo = {
      "week": count,
      "current_le_change": lE[0] + lE[1] / 12 + lE[2] / 365,
      "current_speed": speed,
      current_strength: strength,
      current_health: health,
      current_jump_height: jumpHeight
    }
    console.log("Post Request Data Sent: ")
    console.log(prevInfo)
    getData(prevInfo).then((data) => {
      setlE([data.life_expectancy.years, data.life_expectancy.months, data.life_expectancy.days])
      setSpeed(data.game_stats.speed)
      setStrength(data.game_stats.strength)
      setHealth(data.game_stats.health)
      setJumpHeight(data.game_stats.jump_height)
      const updatedAvatars = avatars.map((avatar, index) => {
        if ([2, 3, 4].includes(index)) {
          return {
            ...avatar,
            health: data.game_stats.health,
            strength: data.game_stats.strength,
            speed: data.game_stats.speed,
            jumpHeight: data.game_stats.jump_height,
            lifeExpectancy: [data.life_expectancy.years, data.life_expectancy.months, data.life_expectancy.days],
            totalSteps: data.health_stats.total_steps,
            totalExercise: data.health_stats.total_workouts,
            maxSpeed: data.health_stats.max_speed,
            bmi: data.health_stats.bmi,
          };
        }
        return avatar
      })
      setAvatars(updatedAvatars)
      setCount((count) => count <= 4 ? count + 1 : count)
      console.log("Data Received")
      console.log(data)
      const robloxData = {
        "speed": data.game_stats.speed,
        "jump": data.game_stats.jump_height,
        "health": data.game_stats.health,
        "strength": data.game_stats.strength
      }
      postData(robloxData).then((data) => {
        console.log("Roblox server response:")
        console.log(data)
      })
    })
  }

  return (
    <>
      <LeIncrease years={avatars[selectedItem].lifeExpectancy[0]} months={avatars[selectedItem].lifeExpectancy[1]} days={avatars[selectedItem].lifeExpectancy[2]} />
      <Carousel avatars={avatars} selected={selectedItem} onCarouselChange={handleCarouselChange} />
      <StatsCard avatar={avatars[selectedItem]} />
      <div style={{display: 'flex', alignItems: 'center', marginTop: '0', justifyContent: 'end', marginRight: '-20px'}}>
        <p style={{marginRight: '8px'}}>Week {count}</p>
        <AiFillForward onClick={() => { if (count <= 4) { handleButtonClick() } }}/>
      </div>
    </>
  )
}

export default App
