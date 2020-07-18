import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './Hero.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {    
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 400,
    cursor: 'pointer',
    position: 'relative'
  },
}));

const Hero = (props) => {

  const classes = useStyles();

  return (
    <Paper className={`${classes.paper} Hero`}>
      <img alt={props.hero.name} src={require('../../../assets/heroes/' + props.hero.image)} className="img-hero" />
    </Paper>
  )
}

export default Hero;