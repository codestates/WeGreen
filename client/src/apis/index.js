import axios from 'axios';

export const requestLogin = (email, password) => {
  console.log(`[로그인 요청] email : ${email}, password: ${password}`);
};

export const requestSignup = (email, username, password) => {
  console.log(
    `[회원가입 요청] email : ${email}, username: ${username}, password: ${password}`
  );
  console.log(process.env.REACT_APP_API_URL);
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
