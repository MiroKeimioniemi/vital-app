import { useState } from 'react'
import './App.css'

import Carousel from './components/Carousel.jsx'
import Avatar from './classes/avatar.js'

import bitmojiAvatar from './images/bitmoji-avatar.png';
import friendBitmoji from './images/friend-bitmoji.jpeg';
import robloxAvatar from './images/roblox-avatar.png';
import minecraftAvatar from './images/minecraft-avatar.jpg';
import plusSign from './images/plus-sign.svg'
import LeIncrease from './components/LeIncrease'
import getData from './services/getData.js'
import postData from './services/updateRoblox.js'


function App() {
  const [selectedItem, setSelectedItem] = useState(2);  
  const handleCarouselChange = (index) => {
    setSelectedItem(index);
  };
  
  const avatars = [
    new Avatar("Add Friend", plusSign, 0, 0, 0, 0, 0),
    new Avatar("Samantha", friendBitmoji, 0, 10, 10, 10, 10),
    new Avatar("Jacob", bitmojiAvatar, 0, 10, 10, 10, 10),
    new Avatar("J4c0b (Roblox)", robloxAvatar, 0, 10, 10, 10, 10),
    new Avatar("Jac0b (Minecraft)", minecraftAvatar, 0, 10, 10, 10, 10),
    new Avatar("Add Avatar", plusSign, 0, 0, 0, 0, 0)
  ]

  const [count, setCount] = useState(1)

  const [lE, setlE] = useState([0, 0, 0]) // year month day
  const [health, setHealth] = useState(10)
  const [speed, setSpeed] = useState(10)
  const [strength, setStrength] = useState(10)
  const [jump_height, setJumpHeight] = useState(10)

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
      setSpeed(data.stats.speed)
      setStrength(data.stats.strength)
      setHealth(data.stats.health)
      setJumpHeight(data.stats.jump_height)
      avatars[3] = new Avatar("J4c0b (Roblox)", robloxAvatar, data.life_expectancy.years + data.life_expectancy.months / 12 + data.life_expectancy.days / 365, data.stats.health, data.stats.strength, data.stats.speed, data.stats.jump_height)
      setCount((count) => count < 4 ? count + 1 : count)
      console.log("Data Recieved")
      console.log(data)
      const robloxData = {
        "speed": data.stats.speed,
        "jump": data.stats,
        "health": data.stats.health,
        "strength": data.stats.strength
      }
      postData(robloxData).then((data) => {
        console.log("Roblox server response:")
        console.log(data)
      })
    })
  }

  return (
    <>
      <h1>Week {count}</h1>
      <button onClick={() => { if (count <= 3) { handleButtonClick() } }}>Next Week</button>
      <LeIncrease value={1.3733141} />
      <Carousel avatars={avatars} selected={selectedItem} onCarouselChange={handleCarouselChange} />
    </>
  )
}

export default App
