import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import avatarImg from '../redux/actions/index';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    this.saveRankingToLocalStorage();
  }

  saveRankingToLocalStorage = () => {
    const { email, name, score } = this.props;
    const recentPlayer = { email, name, score };
    const ranking = localStorage.getItem('ranking');
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([recentPlayer]));
    } else {
      const parsedRanking = JSON.parse(ranking);
      localStorage.setItem('ranking', JSON.stringify([...parsedRanking, recentPlayer]));
    }
  };

  render() {
    const { history, assertions, score, email } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <main>
          <div className="container-feedback">
            <img src={ avatarImg(email) } alt="Avatar" className="avatar" />
            <p data-testid="feedback-text" className="message">
              { assertions >= THREE ? 'Well Done!' : 'Could be better...' }
            </p>
            <p data-testid="feedback-total-score" className="points">
              { score }
            </p>
            <p data-testid="feedback-total-question" className="points">
              { assertions }
            </p>
            <button
              className="btn-feedback"
              type="button"
              data-testid="btn-play-again"
              onClick={ () => history.push('/') }
            >
              Play Again
            </button>
            <button
              className="btn-feedback"
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  email: state.player.email,
  name: state.player.name,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
