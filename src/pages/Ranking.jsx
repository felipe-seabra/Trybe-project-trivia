import React, { Component } from 'react';
import PropTypes from 'prop-types';
import avatarImg from '../redux/actions';

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
      <div data-testid="ranking-title">
        {
          ranking.map((player, index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              <img src={ avatarImg(player.email) } alt={ player.name } />
            </div>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
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
