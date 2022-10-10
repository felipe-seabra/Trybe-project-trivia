import md5 from 'crypto-js/md5';
import { LOGIN } from './actionsTypes';

export const actLogin = (state) => ({
  type: LOGIN,
  state,
});

export const actalgo = () => ({});

const avatarImg = (email) => {
  const gravatarLink = md5(email).toString();
  const url = `https://www.gravatar.com/avatar/${gravatarLink}`;
  return url;
};

export default avatarImg;
