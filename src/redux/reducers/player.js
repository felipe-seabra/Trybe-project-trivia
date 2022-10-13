import { LOGIN, SCORE, CLEAR } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.state.name,
      email: action.state.email,
    };
  case SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case CLEAR:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
