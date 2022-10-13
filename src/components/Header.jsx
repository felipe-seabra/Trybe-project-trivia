import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import avatarImg from '../redux/actions/index';
import iconStar from '../images/star.svg';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;

    return (
      <header>
        <div className="header">
          <img
            data-testid="header-profile-picture"
            src={ avatarImg(email) }
            alt="img-avatar"
            className="img-avatar"
          />
          <p data-testid="header-player-name" className="name">
            { name }
          </p>
          <span>
            <img src={ iconStar } alt="Icon star" className="icon" />
            Points:
          </span>
          <p data-testid="header-score" className="score">
            { score }
          </p>
        </div>
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
