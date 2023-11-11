import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Carousel from './components/Carousel.jsx'

import bitmojiAvatar from './images/bitmoji-avatar.png';
import friendBitmoji from './images/friend-bitmoji.jpeg';
import robloxAvatar from './images/roblox-avatar.png';
import minecraftAvatar from './images/minecraft-avatar.jpg';
import plusSign from './images/plus-sign.svg'
import LeIncrease from './components/LeIncrease'

function App() {
  const [count, setCount] = useState(0)
  const avatars = [
    [plusSign, "Add Friend"],
    [friendBitmoji, "Samantha"],
    [bitmojiAvatar, "Jacob"],
    [robloxAvatar, "J4c0b (Roblox)"],
    [minecraftAvatar, "Jac0b (Minecraft)"],
    [plusSign, "Add avatar"]
  ]

  return (
    <>
      <LeIncrease value={1.3733141} />
      <Carousel avatars={avatars} />
      {/* <div className="card"> */}
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
