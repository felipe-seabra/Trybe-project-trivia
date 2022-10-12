import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import { setLocalStorage } from '../services/localStorage';
import { actLogin as loginAction } from '../redux/actions';
import '../styles/Login.css';
import logo from '../images/logo-trivia.svg';
import config from '../images/config.svg';
import play from '../images/play.svg';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const {
      name, value,
    } = target;
    this.setState({ [name]: value });
  };

  verifyBtn = () => {
    const { name, email } = this.state;
    const MIN_LENGTH = 1;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    return !(name.length >= MIN_LENGTH && emailRegex.test(email));
  };

  handleLogin = async () => {
    const { history, actLogin } = this.props;
    const result = await fetchToken();
    setLocalStorage('token', result);
    actLogin(this.state);
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { name, email } = this.state;
    return (
      <div className="login">
        <img src={ logo } alt="Logo Trivia" className="logo" />
        <section className="login-inputs">
          <input
            type="email"
            placeholder="Qual é o seu e-mail do gravatar?"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Qual é o seu nome?"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </section>
        <div className="link">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyBtn() }
            onClick={ this.handleLogin }
          >
            <img src={ play } alt="Icon Play" className="icon" />
            {' '}
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            <img src={ config } alt="Icon Config" className="icon" />
            {' '}
            Configurações
          </button>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actLogin: (state) => dispatch(loginAction(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
