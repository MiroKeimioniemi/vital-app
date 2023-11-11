import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Carousel from './components/Carousel.jsx'
import Avatar from './classes/avatar.js'

import bitmojiAvatar from './images/bitmoji-avatar.png';
import friendBitmoji from './images/friend-bitmoji.jpeg';
import robloxAvatar from './images/roblox-avatar.png';
import minecraftAvatar from './images/minecraft-avatar.jpg';
import plusSign from './images/plus-sign.svg'
import LeIncrease from './components/LeIncrease'

function App() {
  const avatars = [
    new Avatar("Add Friend", plusSign, 0, 0, 0, 0, 0),
    new Avatar("Samantha", friendBitmoji, 0, 10, 10, 10, 10),
    new Avatar("Jacob", bitmojiAvatar, 0, 10, 10, 10, 10),
    new Avatar("J4c0b (Roblox)", robloxAvatar, 0, 10, 10, 10, 10),
    new Avatar("Jac0b (Minecraft)", minecraftAvatar, 0, 10, 10, 10, 10),
    new Avatar("Add Avatar", plusSign, 0, 0, 0, 0, 0)
  ]

  return (
    <>
      <LeIncrease value={1.3733141} />
      <Carousel avatars={avatars} />
    </>
  )
}

export default App
