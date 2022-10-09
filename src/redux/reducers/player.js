import { LOGIN } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    console.log(action);
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
