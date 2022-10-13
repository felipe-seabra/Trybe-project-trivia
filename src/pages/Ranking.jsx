import React, { Component } from 'react';
import PropTypes from 'prop-types';
import avatarImg from '../redux/actions';
import '../styles/Ranking.css';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.fetchLocalStorage();
  }

  fetchLocalStorage = () => {
    const players = localStorage.getItem('ranking');
    const parsedObj = JSON.parse(players);
    parsedObj.sort((a, b) => (b.score - a.score));
    this.setState({ ranking: parsedObj });
  };

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div className="container-ranking-general">
        <h1 className="title">RANKING</h1>
        <div data-testid="ranking-title" className="container-rankging">
          {
            ranking.map((player, index) => (
              <div key={ index } className="card">
                <img
                  src={ avatarImg(player.email) }
                  alt={ player.name }
                  className="img"
                />
                <p data-testid={ `player-name-${index}` } className="name-player">
                  { player.name }
                </p>
                <p data-testid={ `player-score-${index}` } className="score-player">
                  { player.score }
                </p>
              </div>
            ))
          }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
          className="button-home"
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
