import React from 'react';
import Hero from '../Hero/Hero';
import './Player.scss';

const Player = (props) => {

  const hero = props.hero || {hero: {}};

  return (
    <div className="Player" style={{height: props.height}}>
      <Hero hero={hero} />
    </div>
  );
}

export default Player;