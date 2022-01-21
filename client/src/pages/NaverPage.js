import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions';
import styled from 'styled-components';
import naverIcon from '../assets/images/login_icon_naver.svg';

const NaverLoginInfo = styled.div`
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
  }
`;
var check = false;
const NaverPage = () => {
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
    // eslint-disable-next-line
  }, [loginState.isLogin]);
  if (!check) {
    check = true;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/oauth/naver/login`,
        {
          authorizationCode,
        },
        { 'Content-Type': 'application/json', withCredentials: true }
      )
      .then((result) => {
        dispatch(login(result.data.data));
      })
      .catch((err) => {
        return err.response ? err.response : 'network error';
      });
  }

  return (
    <NaverLoginInfo>
      <img src={naverIcon} alt='네이버 아이콘'></img> 네이버로 로그인 중...
    </NaverLoginInfo>
  );
};

export default NaverPage;
