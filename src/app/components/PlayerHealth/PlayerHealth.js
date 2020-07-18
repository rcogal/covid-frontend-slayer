import React from 'react';
import './PlayerHealth.scss';

const PlayerHealth = (props) => {

  const uiStyles = {
    myBar: {
      width: `${props.health || 0}%`,
      backgroundColor: (props.health > 30 ?  '#4CAF50' : '#FF5733')
    }
  };


  return (
    <section className="PlayerHealth">
      <div className="progress" style={uiStyles.progress}>
        <div className="myBar" style={uiStyles.myBar}>
          {props.health ? `${props.health || 0}%` : ''}
        </div>
      </div>
    </section>
  );
}

export default PlayerHealth;