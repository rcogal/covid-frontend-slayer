import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './HeroList.scss';
import Hero from '../Hero/Hero';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

const HeroList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        {props.heroes.map( item => 
          <Grid item xs={12} sm={4} key={item.heroId}>
            <div onClick={() => props.selectHero(item)}>
              <Hero hero={item} />
            </div>
          </Grid>
        )}

      </Grid>
    </div>
  );
}

export default HeroList;
