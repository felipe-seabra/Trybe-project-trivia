import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/cardQuestions.css';
import { screen } from '@testing-library/react';

class CardQuestion extends Component {
  verifyQuestion = (element, question, index) => {
    if (element === question.correct_answer) { return 'correct-answer'; }
    return `wrong-answer-${index}`;
  };

  handleClick = () => {
    const { handleAnswer } = this.props;
    const btns = screen.getAllByRole('button');
    btns.map((btn) => ((btn.dataset.testid === 'correct-answer')
      ? btn.classList.add('correct')
      : btn.classList.add('incorrect')
    ));
    handleAnswer();
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

CardQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    sortedQuestions: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;

export default CardQuestion;
