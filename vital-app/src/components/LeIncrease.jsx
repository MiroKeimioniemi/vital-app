import React from 'react'; 
import InfoButton from './InfoButton';
 
const LeIncrease = ({ years, months, days }) => {
 
  const textColor = years === 0 && months === 0 && days === 0 ? 'black' : 'green'; 
  const displayYears = years < 10 ? `0${years}` : `${years}`; 
  const displayMonths = months < 10 ? `0${months}` : `${months}`; 
  const displayDays = days < 10 ? `0${days}` : `${days}`;  
 
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
      <InfoButton message={"Estimated increase in life expectancy."} corner={2} />
    </div> 
  ); 
}; 
 
export default LeIncrease;