import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import avatarImg from '../redux/actions/index';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ avatarImg(email) }
          alt="img-avatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
