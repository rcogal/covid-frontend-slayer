import React from 'react';
import MenuAppBar from '../../core/components/MenuAppBar/MenuAppBar';
import Container from '@material-ui/core/Container';
import HeroList from '../../components/HeroList/HeroList';
import Button from '@material-ui/core/Button';
import Game from '../Game/Game';
import './Dashboard.scss';

const heroes = [
  {
    heroId: 1,
    name: 'Luffy',
    image: 'luffy.jpg',
    health: 100,
    type: 'player'
  },
  {
    heroId: 2,
    name: 'Zoro',
    image: 'zorro.jpg',
    health: 100,
    type: 'player'
  },
  {
    heroId: 3,
    name: 'Sanji',
    image: 'sanji.jpg',
    health: 100,
    type: 'player'
  }
];


class Dashboard extends React.Component {

  state = {
    selectedHero: null,
    start: false
  };

  onSelectHero = (hero) => {
    this.setState({
      selectedHero: hero
    });
  }

  startGame = () => {
    this.setState({
      start: true
    });
  }

  stopGame = () => {
    this.setState({
      selectedHero: null,
      start: false
    });
  }

  render() {

    const { selectedHero, start } = this.state;

    /**
     * Responsible display the Hero list
     */
    const HeroDashboard = () => (
      <Container maxWidth="md">
        <section className="hero-list">
          <div className="header">
            <h2 className="title">Select Your Hero {selectedHero && `: ${selectedHero.name}`}</h2>
          </div>
          <HeroList heroes={heroes} selectHero={this.onSelectHero}/>
          <div className="btn-game-container">
              <Button
                className="btn-game"
                type="button"
                variant="contained"
                color="primary"
                size="large"
                disabled={selectedHero === null}
                onClick={this.startGame}
              >
                START GAME
              </Button>
          </div>
        </section>
      </Container>
    );


    /**
     * Display when game is started
     */
    const GameDashboard = () => (
      <Game player={selectedHero} stop={this.stopGame} />
    );

    return (
      <section className="Dashboard">
        <MenuAppBar />
        {start ? <GameDashboard /> : <HeroDashboard />}
      </section>
    );
  }  
}

export default Dashboard;