import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { color, device, contentWidth, boxShadow } from '../styles';
import { requestLogout } from '../apis';
import { logout } from '../actions';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  background-color: ${color.primary};
  box-shadow: ${boxShadow};
`;

const MainNav = styled.nav`
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 0 auto;
  /* padding: 1rem; */
  color: ${color.white};

  span {
    font-weight: bold;
    font-size: 1.25rem;
  }

  @media ${device.laptop} {
    max-width: ${contentWidth};
    padding: 1rem 0;
  }
`;

const MobileNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  background-color: ${color.primary};
  box-shadow: ${boxShadow};

  @media ${device.laptop} {
    display: block;
    width: fit-content;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
  }
`;

const MenuBtn = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;

  span {
    display: inline-block;
    position: absolute;
    top: 9px;
    left: 0;
    width: 20px;
    height: ${(props) => (props.isMenuOpen ? 0 : '2px')};
    border-radius: 1px;
    background-color: ${color.white};
    text-indent: -999px;

    &:before {
      content: '';
      position: absolute;
      top: ${(props) => (props.isMenuOpen ? 0 : '-6px')};
      left: 0;
      width: 20px;
      height: 2px;
      border-radius: 1px;
      background-color: ${color.white};
      transform: ${(props) =>
        props.isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
      transition: all 0.4s ease;
    }

    &:after {
      content: '';
      position: absolute;
      top: ${(props) => (props.isMenuOpen ? 0 : '6px')};
      left: 0;
      width: 100%;
      height: 2px;
      border-radius: 1px;
      background-color: ${color.white};
      transform: ${(props) =>
        props.isMenuOpen ? 'rotate(-45deg)' : 'rotate(0deg)'};
      transition: all 0.4s ease;
    }
  }

  @media ${device.laptop} {
    display: none;
  }
`;

const LinksContainer = styled.div`
  position: absolute;
  top: ${(props) => (props.isMenuOpen ? '60px' : '-300px')};
  left: 0;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
  background-color: ${color.primary};
  opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
  transition: all 0.8s ease;
  box-shadow: ${boxShadow};

  a {
    width: 100%;
    padding: 0.5rem;
    text-align: center;
  }

  button {
    width: 100%;
    padding: 0.5rem;
    color: inherit;
    background-color: transparent;
    text-align: center;
    font-size: inherit;
    cursor: pointer;
  }

  @media ${device.laptop} {
    position: static;
    top: auto;
    right: auto;
    z-index: auto;
    flex-direction: row;
    width: max-content;
    padding: 0;
    opacity: 1;
    word-break: keep-all;
    box-shadow: none;
  }
`;

const Backdrop = styled.div`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    height: 100vh;
    width: 100vw;
    background-color: ${color.backdrop};
    opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
    transition: all 0.4s ease;
    pointer-events: ${(props) => (props.isMenuOpen ? 'auto' : 'none')};
  }

  @media ${device.laptop} {
    display: none;
  }
`;

const Navigation = () => {
  const state = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin } = state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    requestLogout().then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  return (
    <NavigationContainer>
      <MainNav>
        <MobileNavContainer>
          <Link to='/'>
            <Logo height='20px' />
          </Link>
          <MenuBtn isMenuOpen={isMenuOpen} onClick={handleMenuToggle}>
            <span>Menu</span>
          </MenuBtn>
        </MobileNavContainer>
        <LinksContainer
          isMenuOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to='/challenges'>챌린지</Link>
          {isLogin ? (
            <>
              <button onClick={handleLogout}>로그아웃</button>
              <Link to={`/mypage/${state.userInfo.user_id}`}>마이페이지</Link>
            </>
          ) : (
            <>
              <Link to='/login'>로그인</Link>
              <Link to='/signup'>회원가입</Link>
            </>
          )}
        </LinksContainer>
      </MainNav>
      <Backdrop
        isMenuOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      ></Backdrop>
    </NavigationContainer>
  );
};

export default Navigation;
