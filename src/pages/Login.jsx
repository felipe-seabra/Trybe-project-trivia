import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import { setLocalStorage } from '../services/localStorage';

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
    const { history } = this.props;
    const result = await fetchToken();
    setLocalStorage('token', result);
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <section>
          <input
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            type="email"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </section>
        <div>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyBtn() }
            onClick={ this.handleLogin }
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
