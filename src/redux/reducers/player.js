import { LOGIN, ASSERTIONS, SCORE } from '../actions/actionsTypes';

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
  case ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case SCORE:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
