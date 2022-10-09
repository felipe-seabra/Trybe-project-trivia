import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import { setLocalStorage } from '../services/localStorage';
import { actLogin as loginAction } from '../redux/actions';

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
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
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
