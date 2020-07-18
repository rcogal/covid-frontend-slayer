import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GameAction from '../../components/GameAction/GameAction';
import PlayerHealth from '../../components/PlayerHealth/PlayerHealth';
import Player from '../../components/Player/Player';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import './Game.scss';

class Game extends React.Component {

  defaultRoundTime = 60;
  
  state = {
    monster: {
      heroId: 4,
      name: 'Covid Monster',
      image: 'kaido.jpg',
      health: 100,
      type: 'monster'
    },

    player: this.props.player || {},

    open: false,
    
    message: '',

    start: false,

    // Display message in the commentary box
    logs: [],

    timeRemaining: this.defaultRoundTime
  };

  componentDidMount() {
    this.startRoundTime();
  }

  startRoundTime = () => {
    const _time = setTimeout( () => {

      let time = this.state.timeRemaining;

      if (time !== 0 && this.state.open === false) {

        // avoid memory leak
        if (_time) clearTimeout(_time);

        this.setState({
          timeRemaining: --time
        });

        this.startRoundTime();
      } else {
        this.checkWinner();
      }


    }, 1000);
  }

  checkWinner() {

    const player = this.state.player;
    const monster = this.state.monster;

    if (player.health > monster.health) {
      this.setState({
        message: 'You Win! Play Again',
        open: true
      });
    } else if (monster.health > player.health) {
      this.setState({
        message: 'You Lose! Play Again',
        open: true
      });
    } else {
      this.setState({
        message: 'Tie Game! Play Again',
        open: true
      }); 
    }
  }

  /**
   * Generic function for attack player and monster
   * Hero type 
   *  - monster
   *  - player
   */
  health = (hero, life, heal = false) => {

    if (hero.health > 0) {
      const health = hero.health;

      let _health;

      if (heal === true) {
        _health = (health + life) < 100 ? (health + life) : 100;
      } else {
        _health = health > life ? (health - life) : 0;
      }


      this.setState({
        [hero.type]: {
          ...hero,
          health: _health
        }
      });
    }
  }

  log = (message) => {

    const logs = [message, ...this.state.logs].slice(0, 10);

    this.setState({
      logs
    });
  }

  /**
   * Monster attacks the player
   */
  attackPlayer = () => {
    const player = {...this.state.player};
    const damage = this.damage(5, 10);

    this.health(player, damage);
    this.log(`${this.state.monster.name} Attack ${player.name} by ${damage}`);
  }

  /**
   * Player attacks the monster
   */
  attackMonster = () => {
    const monster = {...this.state.monster};
    const damage = this.damage(5, 10);

    this.health(monster, damage);
    this.log(`${this.state.player.name} Attack ${monster.name} by ${damage}`);
  }

  /**
   * Start battle for the two heroes
   */
  startBattle = () => {
    this.attackMonster();
    
    setTimeout( () => {
      this.attackPlayer();
    }, 300);
  }

  /**
   * Blast action
   */
  specialAttack = () => {
    const monster = {...this.state.monster};
    const player = {...this.state.player };
    const playerDamage = this.damage(7, 15);
    const monsterDamage = this.damage(5, 10);

    // player special attack
    this.health(monster, playerDamage);
    this.log(`${player.name} Attack ${monster.name} by ${playerDamage}`);

    // monster counter attack
    this.health(player, monsterDamage);
    this.log(`${monster.name} Attack ${player.name} by ${monsterDamage}`);

  }


  /**
   * Heals the player but also decrease his/her life due to monster attack
   */
  healing = () => {
    const player = {...this.state.player };
    const heal = this.damage(5, 10);
    const monsterDamage = this.damage(5, 10);

    this.health(player, heal, true);
    this.log(`${this.state.player.name} use Healing by ${heal}`);

    setTimeout( () => {
      /**
       * attack player
       */
      this.health(player, monsterDamage);
      this.log(`${this.state.monster.name} Attack ${player.name} by ${monsterDamage}`);
    }, 700);
  }


  /**
   * Returns the random integer
   * 
   * @param {*} min 
   * @param {*} max 
   */
  damage = (min, max) => {
    
    min = Math.ceil(min);
    max = Math.floor(max);

     //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
  }

  giveup = () => {
    this.props.stop();
  }

  handleClose = (play = false) => {
    if (play === true) {
      const monster = {...this.state.monster, health: 100};
      const player = {...this.state.player, health: 100};

      this.setState({
        monster,
        player,
        start: true,
        timeRemaining: this.defaultRoundTime,
        open: false,
        logs: [],
        message: ''
      });

      // defer the round time method so state will have a change to uipdate all
      setTimeout(() => {
        this.startRoundTime();
      });

    } else {
      this.props.stop();
    }
  }


  render() {

    const { monster, player, open, message, logs, timeRemaining } = this.state;

    /**
     * Dispalys the health panel of both players
     */
    const PlayerHealthPanel = () => (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <h1>{player.name}</h1>
          <PlayerHealth health={player.health} />
          <Player hero={player} />
        </Grid>
        <Grid item sm={2}>
        <div className="countdown">{timeRemaining}</div>
        </Grid>
        <Grid item sm={5}>
          <h1>{monster.name}</h1>
          <PlayerHealth health={monster.health} />
          <Player  hero={monster}  />
        </Grid>
      </Grid>
    );


    const MessageDialog = () => 
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No
          </Button>
          <Button onClick={() => this.handleClose(true)} color="secondary" autoFocus>
            Play Again
          </Button>
        </DialogActions>
      </Dialog>


    return (
      <Container maxWidth="xl" className="Game">
        <Grid container spacing={2}>
          <Grid item sm={8}>
            <section className="player-container">

              <PlayerHealthPanel />
              
              <GameAction
                attack={this.startBattle}
                blast={this.specialAttack}
                heal={this.healing}
                giveup={this.giveup}
              />
            </section>
          </Grid>
          <Grid item sm={4}>
            <h1>Commentary</h1>
            <Paper className="commentary-box" square>
              {(logs || []).map( log => 
                <div className="message">{log}</div>
              )}
            </Paper>
          </Grid>
        </Grid>
        <MessageDialog />
      </Container>
    );
  }
}

export default Game;