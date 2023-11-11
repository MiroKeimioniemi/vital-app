import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const StatsCard = ({ avatar }) => {

    console.log(avatar.health)

    let values = []
    if (avatar.nativeAvatar) {
        values = [["Total Steps", avatar.totalSteps], ["Total Exercise", avatar.totalExcercise], ["Max Speed", avatar.maxSpeed], ["BMI", avatar.bmi]]
    } else {
        values = [["Health", avatar.health], ["Speed", avatar.speed], ["Strength", avatar.strength], ["Jump Height", avatar.jumpHeight]]
    }

  return (
    <div className="stats-card">
      {values.map(([attribute, value], index) => (
        <div key={index} className="stats-item">
          <h3>{attribute}</h3>
          <p>{value}</p>
          <FaInfoCircle className="info-icon" />
        </div>
      ))}
    </div>
  );
};

export default StatsCard;