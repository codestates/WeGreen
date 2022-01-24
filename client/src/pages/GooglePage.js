import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions';
import styled from 'styled-components';
import googleIcon from '../assets/images/login_icon_google.svg';
import { color } from '../styles';

const GoogleLoginInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20rem auto;
  img {
    width: 100px;
    height: 100px;
    margin: 0.5rem;
    border-radius: 50%;
    background-color: ${color.primaryLight};
  }
`;
var check = false;
const GooglePage = () => {
  // 인가코드
  const authorizationCode = new URL(window.location.href).search
    .split('=')[1]
    .split('&')[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (loginState.isLogin) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
    // eslint-disable-next-line
  }, [loginState.isLogin]);
  if (!check) {
    check = true;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/oauth/google/login`,
        {
          authorizationCode,
        }
      )
      .then((result) => {
        dispatch(login(result.data.data));
      })
      .catch((err) => {
        return err.response ? err.response : 'network error';
      });
  }

  return (
    <GoogleLoginInfo>
      <img src={googleIcon} alt='구글 아이콘'></img> 구글로 로그인 중...
    </GoogleLoginInfo>
  );
};

export default GooglePage;
