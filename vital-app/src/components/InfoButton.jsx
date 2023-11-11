import React, { useState, useEffect, useRef } from 'react'; 
import { FaInfoCircle } from 'react-icons/fa'; 

function InfoButton({ message, corner }) {
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

    return(
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
            {isInfoOpen && (corner == 1) && (
            <div 
                ref={overlayRef} 
                style={{ 
                    position: 'absolute', 
                    top: '57px', 
                    left: '10px', 
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
                <p>{message}</p> 
            </div> 
            )} 
            {isInfoOpen && (corner == 2) && (
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
                <p>{message}</p> 
            </div> 
            )} 
            {isInfoOpen && (corner == 3) && (
            <div 
                ref={overlayRef} 
                style={{ 
                    position: 'absolute', 
                    top: '-20px', 
                    left: '10px', 
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
                <p>{message}</p> 
            </div> 
            )}
            {isInfoOpen && (corner == 4) && (
            <div 
                ref={overlayRef} 
                style={{ 
                    position: 'absolute', 
                    top: '-20px', 
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
                <p>{message}</p> 
            </div> 
            )}
        </span>
    )
}

export default InfoButton;