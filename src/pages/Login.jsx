import React from 'react';

export default class Login extends React.Component {
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
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}
