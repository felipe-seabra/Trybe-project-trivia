import { getLocalStorage } from './localStorage';

function fetchQuestions() {
  const END_POINT = 'https://opentdb.com/api.php?amount=5&token=';
  const token = getLocalStorage('token');

  return fetch(`${END_POINT}${token}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

export default fetchQuestions;
