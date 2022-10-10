import { LOGIN } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.state.name,
      email: action.state.email,
    };
  default:
    return state;
  }
};

export default player;
