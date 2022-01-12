import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserinfo, logout } from '../actions';
import { requestMyinfo, updateMyinfo, modifyPassword, signout } from '../apis';
import styled from 'styled-components';
import { color, device, contentWidth, boxShadow } from '../styles';
import Illust from '../components/Illust';
import InputForm from '../components/InputForm';
import TextareaForm from '../components/TextareaForm';
import Button from '../components/Button';
import Modal from '../components/Modal';
import BadgeModal from '../components/BadgeModal';
import { ReactComponent as Wave } from '../assets/images/wave.svg';

const Container = styled.div`
  @media ${device.laptop} {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${color.primaryLight};
  }
`;

const EditMyinfoContainer = styled.div`
  background-color: ${color.white};

  & h4 {
    margin-bottom: 0.5rem;
  }

  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: ${contentWidth};
    height: 100%;
    box-shadow: ${boxShadow};
  }
`;

const EditMyinfoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    width: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`;

const TitleContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding-top: 2rem;
    h1 {
      color: ${color.white};
      text-align: center;
    }
    background-color: ${color.primary};
  }
`;

const EditMyinfoBioContainer = styled.div`
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const BadgeNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const MainBadgeImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  background-color: ${color.primary};
`;

const ModifyPasswordContainer = styled.div`
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`;

const InvalidMessage = styled.p`
  margin: 0;
  padding-left: 1rem;
  color: ${color.warning};
  font-size: 0.875rem;
  word-break: keep-all;
`;

const SignoutContainer = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 1rem;
`;

const BackContainer = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 2rem 1rem;
`;

const Divider = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  height: 0;
  padding: 0 1rem;
  text-align: center;

  &::before {
    content: '';
    display: block;
    border-bottom: 1px solid ${color.primaryBorder};
  }
`;

const EditMyinfo = () => {
  const state = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('no status');

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  const [myinfo, setMyinfo] = useState(state.userInfo);
  const [modify, setModify] = useState({
    now: '',
    new: '',
    re: '',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  useEffect(() => {
    if (!state.isLogin) {
      navigate('/');
    } else {
      requestMyinfo(`${myinfo.user_id}`).then((result) => {
        const data = result.user_info;
        dispatch(updateUserinfo(data));
      });
    }
    // eslint-disable-next-line
  }, []);

  const onChangePassword = (val) => {
    handleInputPassword('new')(val);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    if (!passwordRegex.test(val)) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const onChangePasswordConfirm = (val) => {
    handleInputPassword('re')(val);
    if (modify.new !== val) {
      setIsValidPasswordConfirm(false);
    } else {
      setIsValidPasswordConfirm(true);
    }
  };

  const handleInputPassword = (key) => (value) => {
    setModify({ ...modify, [key]: value });
  };
  const handleMyinfo = (key) => (value) => {
    setMyinfo({ ...myinfo, [key]: value });
  };

  const handleIsExpanded = () => setIsExpanded(true);

  const handleUpdateMyinfo = () => {
    if (
      !(
        myinfo.username === state.userInfo.username &&
        myinfo.bio === state.userInfo.bio &&
        myinfo.badge_id === state.userInfo.badge_id
      )
    ) {
      updateMyinfo(`${myinfo.user_id}`, {
        username: myinfo.username,
        bio: myinfo.bio,
        badge_id: myinfo.badge_id,
      })
        .then((result) => {
          setResponseStatus('success modify profile');
          setIsModalOpen(true);
          dispatch(updateUserinfo(result));
        })
        .catch((err) => {
          setResponseStatus('no status');
          setIsModalOpen(true);
        });
    }
  };

  const handleModifyPassword = () => {
    if (isValidPassword && isValidPasswordConfirm) {
      modifyPassword(`${myinfo.user_id}`, {
        currentPWD: modify.now,
        newPWD: modify.new,
      })
        .then((result) => {
          setResponseStatus('success modify password');
          setIsModalOpen(true);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setResponseStatus('unauthorized');
            setIsModalOpen(true);
          } else {
            setResponseStatus('no status');
            setIsModalOpen(true);
          }
        });
    }
  };

  const handleSignoutModal = () => {
    setResponseStatus('confirm signout');
    setIsModalOpen(true);
  };

  const handleSignout = () => {
    signout()
      .then((result) => {
        setResponseStatus('success signout');
        setIsModalOpen(true);
        dispatch(logout());
      })
      .catch((err) => {
        setResponseStatus('no status');
        setIsModalOpen(true);
      });
  };

  const ModalMessage = ({ status, btnHandler = () => {} }) => {
    switch (status) {
      case 'success modify profile':
        return (
          <>
            <p>프로필이 수정되었습니다.</p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      case 'success modify password':
        return (
          <>
            <p>비밀번호가 변경되었습니다.</p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      case 'unauthorized':
        return (
          <>
            <p>
              현재 비밀번호가 일치하지 않거나 <br />
              로그인이 만료되었습니다. <br />
              다시 시도해주세요.
            </p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      case 'confirm signout':
        return (
          <>
            <p>
              탈퇴하시면 뱃지와 모든 활동 <br />
              기록을 잃게 됩니다. <br />
              그래도 탈퇴하시겠습니까?
            </p>
            <Button content='네, 탈퇴하겠습니다' handler={handleSignout} />
          </>
        );
      case 'success signout':
        return (
          <>
            <p>회원탈퇴가 완료되었습니다.</p>
            <Button content='확인' handler={() => navigate('/')} />
          </>
        );
      default:
        return (
          <>
            <p>
              에러가 발생하였습니다. <br />
              다시 시도해 주세요.
            </p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
    }
  };

  return (
    <Container>
      <EditMyinfoContainer>
        <Illust />
        <EditMyinfoSection>
          <TitleContainer>
            <h1>회원정보수정</h1>
            <Wave width='100%' height='100' fill={color.white} />
          </TitleContainer>
          <EditMyinfoBioContainer>
            <BadgeNameContainer>
              <MainBadgeImg
                badgeId={1}
                alt='대표뱃지'
                onClick={() => setIsBadgeModalOpen(true)}
              />
              <InputForm
                defaultValue={myinfo.username}
                placeholder='사용자 이름'
                handleValue={handleMyinfo('username')}
              />
            </BadgeNameContainer>
            <TextareaForm
              defaultValue={myinfo.bio}
              placeholder='사용자 소개'
              handleValue={handleMyinfo('bio')}
            />
            <Button content='저장하기' handler={handleUpdateMyinfo} />
          </EditMyinfoBioContainer>
          <Divider />
          <ModifyPasswordContainer>
            <h4>비밀번호 변경</h4>
            {isExpanded ? (
              <>
                <InputForm
                  type='password'
                  placeholder='현재 비밀번호'
                  handleValue={handleInputPassword('now')}
                />
                <InputForm
                  type='password'
                  placeholder='새로운 비밀번호'
                  handleValue={onChangePassword}
                />
                {isValidPassword ? null : (
                  <InvalidMessage>
                    *비밀번호는 최소 8자리 이상이어야 하며 영문자, 숫자,
                    특수문자(!@#$%^&*?)가 1개 이상 사용되어야 합니다.
                  </InvalidMessage>
                )}
                <InputForm
                  type='password'
                  placeholder='새로운 비밀번호 확인'
                  handleValue={onChangePasswordConfirm}
                />
                {isValidPasswordConfirm ? null : (
                  <InvalidMessage>*비밀번호가 다릅니다.</InvalidMessage>
                )}
                <Button
                  content='비밀번호 변경'
                  handler={handleModifyPassword}
                />
              </>
            ) : (
              <Button
                content='비밀번호 변경'
                color='tertiary'
                handler={handleIsExpanded}
              />
            )}
          </ModifyPasswordContainer>
          <Divider />
          <SignoutContainer>
            <h4>회원탈퇴</h4>
            <Button
              content='회원탈퇴'
              color='tertiary'
              handler={handleSignoutModal}
            />
          </SignoutContainer>
          <Divider />
          <BackContainer>
            <Button
              content='마이페이지'
              color='secondary'
              handler={() => navigate('/mypage')}
            />
          </BackContainer>
        </EditMyinfoSection>
        {isModalOpen ? (
          <Modal closeModal={setIsModalOpen}>
            <ModalMessage
              status={responseStatus}
              btnHandler={() => setIsModalOpen(false)}
            />
          </Modal>
        ) : null}
        {isBadgeModalOpen ? (
          <BadgeModal closeModal={setIsBadgeModalOpen}></BadgeModal>
        ) : null}
      </EditMyinfoContainer>
    </Container>
  );
};

export default EditMyinfo;
