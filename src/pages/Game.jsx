import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchQuestions from '../services/fetchQuestions';

class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const { results } = await fetchQuestions();
    // caso não tenha retorno, volta para a tela de login
    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }
    // salva as questões no state local
    this.setState((prevState) => ({
      ...prevState,
      questions: [...results],
    }));
  }

  render() {
    return (
      // aqui vai o Header ...
      <main>
        <div>
          Game
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
