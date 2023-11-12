import React from 'react';
import InfoButton from './InfoButton';

import '../stylesheets/StatsCard.css';

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-20px'}}>
                <h3 className="attribute">{attribute}</h3>
                <InfoButton message={"hellou"} corner={index + 1} />
            </div>
            <p className='value'>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;