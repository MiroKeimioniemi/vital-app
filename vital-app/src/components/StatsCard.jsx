import React from 'react';
import InfoButton from './InfoButton';

const StatsCard = ({ avatar }) => {

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
          <InfoButton message={"hellou"} corner={1} />
        </div>
      ))}
    </div>
  );
};

export default StatsCard;