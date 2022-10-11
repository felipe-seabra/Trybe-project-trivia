import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/cardQuestions.css';
import { screen } from '@testing-library/react';
import { getScore } from '../redux/actions';

const correct = 'correct-answer';
class CardQuestion extends Component {
  verifyQuestion = (element, question, index) => {
    if (element === question.correct_answer) { return correct; }
    return `wrong-answer-${index}`;
  };

  handleScore = () => {
    const { timer, question } = this.props;
    const TREE = 3;
    const TWO = 2;
    const ONE = 1;
    const TEN = 10;
    switch (question.difficulty) {
    case 'hard':
      return TEN + (timer * TREE);
    case 'medium':
      return TEN + (timer * TWO);
    case 'easy':
      return TEN + (timer * ONE);
    default:
      return null;
    }
  };

  handleClick = ({ target }) => {
    const { handleAnswer, dispatch } = this.props;
    const btns = screen.getAllByRole('button');
    btns.map((btn) => ((btn.dataset.testid === correct)
      ? btn.classList.add('correct')
      : btn.classList.add('incorrect')
    ));
    handleAnswer();
    // console.log(target);
    if (target.classList.contains('correct')) {
      dispatch(getScore(this.handleScore()));
    }
  };

  handleTimer = () => {
    const { timer, disableCheck } = this.props;
    if (timer === 0 || disableCheck) {
      return true;
    }
  };

  render() {
    const { question, timer } = this.props;
    return (
      <div>
        <p data-testid="question-category">
          {
            question.category
          }
        </p>
        <p data-testid="question-text">
          {
            question.question
          }
        </p>
        <div data-testid="answer-options">
          {
            question.sortedQuestions.map((element, index) => (
              <button
                className="btn"
                type="button"
                key={ index }
                data-testid={ this.verifyQuestion(element, question, index) }
                onClick={ this.handleClick }
                disabled={ this.handleTimer() }
              >
                { element }
              </button>
            ))
          }
          <p>{timer}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

CardQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    sortedQuestions: PropTypes.arrayOf(PropTypes.string),
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(CardQuestion);
