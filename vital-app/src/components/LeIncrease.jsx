import React, { useState, useEffect, useRef } from 'react'; 
import { FaInfoCircle } from 'react-icons/fa'; 
 
const LeIncrease = ({ years, months, days }) => { 
  const [isInfoOpen, setIsInfoOpen] = useState(false); 
  const overlayRef = useRef(null); 
 
  const textColor = years === 0 && months === 0 && days === 0 ? 'black' : 'green'; 
  const displayYears = years < 10 ? `0${years}` : `${years}`; 
  const displayMonths = months < 10 ? `0${months}` : `${months}`; 
  const displayDays = days < 10 ? `0${days}` : `${days}`; 
 
  const handleInfoClick = () => { 
    setIsInfoOpen(!isInfoOpen); 
  }; 
 
  const handleClickOutside = (event) => { 
    if (overlayRef.current && !overlayRef.current.contains(event.target)) { 
      setIsInfoOpen(false); 
    } 
  }; 
 
  useEffect(() => { 
    document.addEventListener('mousedown', handleClickOutside); 
 
    return () => { 
      document.removeEventListener('mousedown', handleClickOutside); 
    }; 
  }, []); 
 
  return ( 
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        textAlign: 'center', 
      }} 
    > 
      <div style={{ marginRight: '0.5em' }}> 
        <h1 style={{ color: textColor, margin: 0, padding: 0 }}>+</h1> 
      </div> 
      <div style={{ marginRight: '1em' }}> 
        <h1 style={{ color: textColor, margin: 0, padding: 0 }}>{displayYears}</h1> 
        <p style={{ margin: 0, padding: 0 }}>years</p> 
      </div> 
      <div style={{ marginRight: '1em' }}> 
        <h1 style={{ color: textColor, margin: 0, padding: 0 }}>{displayMonths}</h1> 
        <p style={{ margin: 0, padding: 0 }}>months</p> 
      </div> 
      <div style={{ marginRight: '0.5em' }}> 
        <h1 style={{ color: textColor, margin: 0, padding: 0 }}>{displayDays}</h1> 
        <p style={{ margin: 0, padding: 0 }}>days</p> 
      </div> 
      <span style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'top' }}> 
        <FaInfoCircle 
          onClick={handleInfoClick} 
          style={{ 
            fontSize: '1em', 
            color: 'black', 
            borderRadius: '50%', 
            padding: '0.2em', 
            paddingTop: '0.75em' 
          }} 
        /> 
        {isInfoOpen && ( 
          <div 
            ref={overlayRef} 
            style={{ 
              position: 'absolute', 
              top: '57px', 
              right: '10px', 
              transform: 'translateY(-50%)', 
              width: '134px', 
              height: '50px', 
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              padding: '1em', 
              borderRadius: '8px', 
              textAlign: 'left', 
              color: 'white', 
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center' 
            }} 
          > 
            <p>Estimated increase in life expectancy</p> 
          </div> 
        )} 
      </span> 
    </div> 
  ); 
}; 
 
export default LeIncrease;