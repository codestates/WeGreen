import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions';
import styled from 'styled-components';
import kakaoIcon from '../assets/images/login_icon_kakao.svg';
import { color } from '../styles';

const KakaoLoginInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20rem auto;
  img {
    width: 60px;
    height: 60px;
    margin: 0.5rem;
    border-radius: 50%;
    background-color: ${color.primaryLight};
  }
`;

const KakaoPage = () => {
  // 인가코드
  const authorizationCode = new URL(window.location.href).searchParams.get(
    'code'
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (loginState.isLogin) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [loginState.isLogin]);

  axios
    .post(
      `${process.env.REACT_APP_API_URL}/oauth/kakao/login`,
      {
        authorizationCode,
      },
      { 'Content-Type': 'application/json', withCredentials: true }
    )
    .then((result) => {
      console.log('THIS IS CLIENT SIDE RESULT DATA!!', result.data);
      dispatch(login(result.data.data));
    })
    .catch((err) => {
      return err.response ? err.response : 'network error';
    });
  return (
    <KakaoLoginInfo>
      <img src={kakaoIcon}></img> 카카오톡으로 로그인 중...
    </KakaoLoginInfo>
  );
};

export default KakaoPage;
