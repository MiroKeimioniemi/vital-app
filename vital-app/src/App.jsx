import { useState, useEffect } from 'react'
import './App.css'

import Carousel from './components/Carousel.jsx'
import Avatar from './classes/avatar.js'
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

  const avatars = [
    new Avatar("Add Friend", plusSign, true),
    new Avatar("Samantha", friendBitmoji, true, 1, 10, 10, 10, 10, 0, 0, 0, 0, 21.7),
    new Avatar("Jacob", bitmojiAvatar, true, 1, 10, 10, 10, 10, 0, 0, 0, 0, 21.7),
    new Avatar("J4c0b (Roblox)", robloxAvatar, false, 1, 10, 10, 10, 10, 0, 0, 0, 0, 21.7),
    new Avatar("Jac0b (Minecraft)", minecraftAvatar, false, 1, 10, 10, 10, 10, 0, 0, 0, 0, 21.7),
    new Avatar("Add Avatar", plusSign, false)
  ]

  const [count, setCount] = useState(1)

  const [lE, setlE] = useState([0, 0, 0]) // year month day
  const [health, setHealth] = useState(10)
  const [speed, setSpeed] = useState(10)
  const [strength, setStrength] = useState(10)
  const [jump_height, setJumpHeight] = useState(10)


  useEffect(() => {
    const robloxData = {
      "speed": speed,
      "jump": jump_height,
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
      current_jump_height: jump_height
    }
    console.log("Post Request Data Sent: ")
    console.log(prevInfo)
    getData(prevInfo).then((data) => {
      setlE([data.life_expectancy.years, data.life_expectancy.months, data.life_expectancy.days])
      setSpeed(data.game_stats.speed)
      setStrength(data.game_stats.strength)
      setHealth(data.game_stats.health)
      setJumpHeight(data.game_stats.jump_height)
      avatars[3] = new Avatar("J4c0b (Roblox)", robloxAvatar, data.life_expectancy.years + data.life_expectancy.months / 12 + data.life_expectancy.days / 365, data.game_stats.health, data.game_stats.strength, data.game_stats.speed, data.game_stats.jump_height)
      setCount((count) => count < 4 ? count + 1 : count)
      console.log("Data Recieved")
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
      <LeIncrease years={2} months={5} days={26} />
      <Carousel avatars={avatars} selected={selectedItem} onCarouselChange={handleCarouselChange} />
      <StatsCard avatar={avatars[selectedItem]} />
      <div style={{display: 'flex', alignItems: 'center', marginTop: '0'}}>
        <p style={{marginRight: '8px'}}>Week {count}</p>
        <AiFillForward onClick={() => { if (count <= 3) { handleButtonClick() } }}/>
      </div>
    </>
  )
}

export default App
