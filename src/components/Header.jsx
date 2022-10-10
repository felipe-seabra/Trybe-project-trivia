import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import avatarImg from '../redux/actions/index';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ avatarImg(email) }
          alt="img-avatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps, null)(Header);
