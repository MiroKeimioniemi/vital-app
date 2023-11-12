import React from 'react';
import InfoButton from './InfoButton';

import '../stylesheets/StatsCard.css';

const StatsCard = ({ avatar }) => {

  let values = []
  if (avatar.nativeAvatar) {
    values = [["Total Steps", avatar.totalSteps, "Cumulative number of steps over all time.", 2], ["Total Exercise", avatar.totalExercise, "Cumulative hours of exercise over all time.", 2], ["Max Speed", avatar.maxSpeed, "Maximum sprint speed in km/h.", 2], ["BMI", avatar.bmi, "Latest body mass index measuring in kg/m^2.", 2]]
  } else {
    values = [["Health", avatar.health, "Health attribute can be increased with sleep score.", 2], ["Speed", avatar.speed, "Speed attribute can be increased by cardio exercise.", 2], ["Strength", avatar.strength, "Strength can be increased by moderate exercise.", 2], ["Jump Height", avatar.jumpHeight, "Jump Height is increased by leg-intensive exercise.", 2]]
  }

  return (
    <div className="stats-card">
      {values.map(([attribute, value, message, corner], index) => (
        <div key={index} className="stats-item">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-20px'}}>
            <h3 className="attribute">{attribute}</h3>
            <InfoButton message={message} corner={corner} />
          </div>
          <p className='value'>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;