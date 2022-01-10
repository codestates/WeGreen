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
      return result;
    })
    .catch((err) => {
      return err.response ? err.response : 'network error';
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
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.response ? err.response : 'network error';
    });
};

export const requestLogout = () => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/logout`,
      {},
      { 'Content-Type': 'application/json', withCredentials: true, }
    )
    .then((result) => console.log(result));
};

export const requestPopularChallenges = (limit, query) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/challenges/popular?limit=${limit}${
        query ? '$query=' + query : ''
      }`,
      {},
      {
        'Content-Type': 'application/json',
        withCredentials: true,
      }
    )
    .then((result) => result.data.data);
};

export const requestMyinfo = (userId) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
    .then((result) => result.data.data);
};

export const updateMyinfo = (userId, body) => {
  return axios
    .patch(`${process.env.REACT_APP_API_URL}/users/${userId}`,
      body,
      { 'Content-Type': 'application/json', withCredentials: true, }
    )
    .then((result) => result.data.data);
};

export const modifyPassword = (userId, body) => {
  return axios
    .patch(`${process.env.REACT_APP_API_URL}/users/${userId}/password`,
      body,
      { 'Content-Type': 'application/json', withCredentials: true, }
    )
    .then((result) => result.data);
};

export const signout = () => {
  console.log(`${process.env.REACT_APP_API_URL}/users/signout`)
  return axios
    .delete(`${process.env.REACT_APP_API_URL}/users/signout`,
      { headers: {'Content-Type': 'application/json', withCredentials: true, } }
    )
    .then((result) => result.data);
};

export const createChallenge = (body) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/challenges`,
      body,
      { 'Content-Type': 'application/json', withCredentials: true, }
    )
    .then((result) => result.data);
}
