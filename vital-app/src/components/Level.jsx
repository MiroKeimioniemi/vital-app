import React from 'react';
import InfoButton from './InfoButton';
 
const Level = ({ level }) => {
  return ( 
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        textAlign: 'center', 
      }} 
    >
      <div style={{ marginRight: '0.5em' }}>
        <h1 style={{ margin: 0, padding: 0}}>Level {level}</h1> 
        <p style={{ margin: 0, padding: 0, color: '#FBFBFB' }}>Level</p> 
      </div>
    </div> 
  ); 
}; 
 
export default Level;