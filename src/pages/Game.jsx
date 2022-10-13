import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { screen } from '@testing-library/react';
import fetchQuestions from '../services/fetchQuestions';
import sortQuestions from '../services/sortQuestions';
import CardQuestion from '../components/CardQuestion';
import Header from '../components/Header';
import '../styles/Game.css';

let MAX_INDEX = 0;

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
        }
        ));
      }
      if (timer === 0) {
        this.setState({
          answered: true,
        });
      }
    }, ONE_SECOND);
  };

  handleAnswer = () => {
    const { answered } = this.state;
    this.setState({ answered: !answered });
  };

  handleClick = async () => {
    const { index } = this.state;
    const { history } = this.props;
    const MAX_GAMES = 5;

    function cssReset(element) { element.className = 'btn'; }
    const btns = await screen.getAllByRole('button');
    btns.map((btn) => (cssReset(btn)));
    MAX_INDEX += 1;
    if (MAX_INDEX === MAX_GAMES) {
      history.push('/feedback');
    }

    if (await index <= MAX_GAMES) {
      this.setState({
        index: index + 1,
        timer: 30,
        answered: false,
      });
    }
  };

  render() {
    const { questions, index, timer, answered } = this.state;
    const number = 5;
    return (
      <div>
        <Header />
        <main>
          <div className="container">
            <div>
              { !!questions.length && !!MAX_INDEX <= number && ( // aguardar o estado ser gravado
                <CardQuestion
                  question={ questions[index] }
                  timer={ timer }
                  handleAnswer={ this.handleAnswer }
                  disableCheck={ answered }
                />
              ) }
            </div>
            { answered
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleClick }
              className="btn-next"
            >
              Next
            </button>
          ) }
          </div>
        </main>
      </div>
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
