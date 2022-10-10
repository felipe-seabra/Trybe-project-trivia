import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardQuestion extends Component {
  verifyQuestion = (element, question, index) => {
    if (element === question.correct_answer) { return 'correct-answer'; }
    return `wrong-answer-${index}`;
  };

  render() {
    const { question } = this.props;
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
              >
                {element}
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

CardQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    sortedQuestions: PropTypes.string,
  }).isRequired,
};

export default CardQuestion;
