import React from 'react'; 
 
const PlaceHolder = () => {
  const textColor = '#FBFBFB'
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
        <h1 style={{ color: textColor, margin: 0, padding: 0 }}>{'00'}</h1> 
        <p style={{ margin: 0, padding: 0, color: textColor }}>years</p> 
      </div> 
      <div style={{ marginRight: '1em' }}> 
        <h1 style={{ color: textColor, margin: 0, padding: 0 }}>{'00'}</h1> 
        <p style={{ margin: 0, padding: 0, color: textColor }}>months</p> 
      </div> 
      <div style={{ marginRight: '0.5em' }}> 
        <h1 style={{ color: textColor, margin: 0, padding: 0 }}>{'00'}</h1> 
        <p style={{ margin: 0, padding: 0, color: textColor }}>days</p> 
      </div> 
    </div> 
  ); 
}; 
 
export default PlaceHolder;