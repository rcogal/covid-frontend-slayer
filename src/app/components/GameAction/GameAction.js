import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './GameAction.scss';

const GameAction = (props) => {

  return (
    <Grid container spacing={2} className="GameAction">
      <Grid item sm={3}>
        <Button
          className="btn-attack"
          type="button"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={props.attack}
        >
          ATTACK
        </Button>
      </Grid>
      <Grid item sm={3}>
        <Button
          className="btn-blast"
          type="button"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={props.blast}
        >
          BLAST
        </Button>
      </Grid>
      <Grid item sm={3}>
        <Button
          className="btn-heal"
          type="button"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={props.heal}
        >
          HEAL
        </Button>
      </Grid>
      <Grid item sm={3}>
        <Button
          className="btn-giveup"
          type="button"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={props.giveup}
        >
          GIVE UP
        </Button>
      </Grid>
    </Grid>
  );
}

export default GameAction;