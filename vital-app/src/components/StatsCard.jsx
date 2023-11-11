import React from 'react';
import { FaInfoCircle } from 'react-icons/fa'; // Import the info icon

const StatsCard = ({ values }) => {
  return (
    <div className="stats-card">
      {values.map((item, index) => (
        <div key={index} className="stats-item">
          <h3>{item.heading}</h3>
          <p>{item.value}</p>
          <FaInfoCircle className="info-icon" />
        </div>
      ))}
    </div>
  );
};

export default StatsCard;