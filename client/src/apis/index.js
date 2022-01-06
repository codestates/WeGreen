import axios from 'axios';

export const requestLogin = (email, password) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      {
        email,
        password,
      },
      { 'Content-Type': 'application/json', withCredentials: true }
    )
    .then((result) => {
      return result.data.data;
    });
};

export const requestSignup = (email, username, password) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/signup`,
      {
        email,
        username,
        password,
      },
      { 'Content-Type': 'application/json', withCredentials: true }
    )
    .then((result) => console.log(result));
};
