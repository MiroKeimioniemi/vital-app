import React from 'react'; 
 
const PlaceHolder = () => {
  return ( 
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        textAlign: 'center', 
      }} 
    > 
      <div style={{ marginRight: '0.5em' }}> 
        <h1 style={{ color: 'white', margin: 0, padding: 0 }}>+</h1> 
      </div> 
      <div style={{ marginRight: '1em' }}> 
        <h1 style={{ color: 'white', margin: 0, padding: 0 }}>{'00'}</h1> 
        <p style={{ margin: 0, padding: 0, color: 'white' }}>years</p> 
      </div> 
      <div style={{ marginRight: '1em' }}> 
        <h1 style={{ color: 'white', margin: 0, padding: 0 }}>{'00'}</h1> 
        <p style={{ margin: 0, padding: 0, color: 'white' }}>months</p> 
      </div> 
      <div style={{ marginRight: '0.5em' }}> 
        <h1 style={{ color: 'white', margin: 0, padding: 0 }}>{'00'}</h1> 
        <p style={{ margin: 0, padding: 0, color: 'white' }}>days</p> 
      </div> 
    </div> 
  ); 
}; 
 
export default PlaceHolder;