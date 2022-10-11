import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchQuestions from '../services/fetchQuestions';
import sortQuestions from '../services/sortQuestions';
import CardQuestion from '../components/CardQuestion';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    timer: 30,
    answered: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const { results } = await fetchQuestions();
    // caso não tenha retorno, volta para a tela de login
    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }
    // embaralhar as respostas
    const sorted = results.map(sortQuestions);
    // salva as questões no state local
    this.setState((prevState) => ({
      ...prevState,
      questions: [...sorted],
    }));
    this.handleTimer();
  }

  handleTimer = () => {
    const ONE_SECOND = 1000;

    setInterval(async () => {
      const { timer, answered } = this.state;
      if (timer > 0 && !answered) {
        this.setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
        }));
      }
    }, ONE_SECOND);
  };

  handleAnswer = () => {
    const { answered } = this.state;
    this.setState({ answered: !answered });
  };

  render() {
    const { questions, index, timer, answered } = this.state;
    return (

      <main>
        <div>
          <Header />
          { !!questions.length && ( // aguardar o estado ser gravado
            <CardQuestion
              question={ questions[index] }
              timer={ timer }
              handleAnswer={ this.handleAnswer }
              disableCheck={ answered }
            />
          ) }
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
