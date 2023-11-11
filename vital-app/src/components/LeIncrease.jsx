import React, { useState, useEffect, useRef } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const LeIncrease = ({ value }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const overlayRef = useRef(null);

  const formattedValue = value.toFixed(3);
  const textColor = value === 0 ? 'black' : 'green';
  const displayValue = value > 0 ? `+${formattedValue}` : formattedValue;

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
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: textColor, margin: 0 }}>{displayValue}</h1>
      <span style={{ display: 'flex', alignItems: 'center', marginLeft: '0.3em' }}>
        <h2 style={{ margin: 0, color: 'gray', fontSize: '1.5em' }}>yr</h2>
        <span style={{ marginLeft: '0.2em', cursor: 'pointer', position: 'relative' }}>
          <FaInfoCircle
            onClick={handleInfoClick}
            style={{
              fontSize: '1em',
              color: 'black',
              border: '1px solid black',
              borderRadius: '50%',
              padding: '0.2em',
            }}
          />
          {isInfoOpen && (
            <div
              ref={overlayRef}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% transparency
                padding: '1em',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'white',
              }}
            >
              <p>Additional information about the number...</p>
              <button onClick={handleInfoClick} style={{ marginTop: '0.5em' }}>
                Close
              </button>
            </div>
          )}
        </span>
      </span>
    </div>
  );
};

export default LeIncrease;