import React, { useState, useEffect, useRef } from 'react'; 
import { FaInfoCircle } from 'react-icons/fa'; 

const StatsCard = ({ avatar }) => {
    const [isInfoOpen, setIsInfoOpen] = useState(false); 
    const overlayRef = useRef(null); 
    
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

    let values = []
    if (avatar.nativeAvatar) {
        values = [["Total Steps", avatar.totalSteps], ["Total Exercise", avatar.totalExercise], ["Max Speed", avatar.maxSpeed], ["BMI", avatar.bmi]]
    } else {
        values = [["Health", avatar.health], ["Speed", avatar.speed], ["Strength", avatar.strength], ["Jump Height", avatar.jumpHeight]]
    }

  return (
    <div className="stats-card">
      {values.map(([attribute, value], index) => (
        <div key={index} className="stats-item">
          <h3>{attribute}</h3>
          <p>{value}</p>
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
      ))}
    </div>
  );
};

export default StatsCard;