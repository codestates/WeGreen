import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle, updateUserinfo, logout } from '../actions';
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
import Badges from '../assets/images/badges/badges';

const Container = styled.div`
  @media ${device.laptop} {
    width: 100%;
    height: 100%;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
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
  const dispatch = useDispatch();
  dispatch(changeTitle('Edit Myinfo'));
  const state = useSelector((state) => state.userReducer);
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
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidBio, setIsValidBio] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  useEffect(() => {
    if (!state.isLogin) {
      navigate('/');
    } else {
      requestMyinfo(`${myinfo.user_id}`).then((result) => {
        setMyinfo({ ...myinfo, ...result.user_info });
        const data = result.user_info;
        dispatch(updateUserinfo(data));
      });
    }
    // eslint-disable-next-line
  }, []);

  const onChangeUsername = (val) => {
    handleMyinfo('username')(val);
    if (val.length >= 2 && val.length <= 15) {
      setIsValidUsername(true);
    } else {
      setIsValidUsername(false);
    }
  };

  const onChangeBio = (val) => {
    handleMyinfo('bio')(val);
    if (val.length >= 3 && val.length <= 80) {
      setIsValidBio(true);
    } else {
      setIsValidBio(false);
    }
  };

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

  const handleMyinfo = (key) => (value) => {
    setMyinfo({ ...myinfo, [key]: value });
  };

  const handleInputPassword = (key) => (value) => {
    setModify({ ...modify, [key]: value });
  };

  const handleIsExpanded = () => setIsExpanded(true);

  const handleUpdateMyinfo = () => {
    if (isValidUsername && isValidBio) {
      if (
        !(
          myinfo.username === state.userInfo.username &&
          myinfo.bio === state.userInfo.bio
        )
      ) {
        updateMyinfo(`${myinfo.user_id}`, {
          username: myinfo.username,
          bio: myinfo.bio,
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
      } else {
        setResponseStatus('not changed');
        setIsModalOpen(true);
      }
    } else {
      setResponseStatus('invalid info');
      setIsModalOpen(true);
    }
  };

  const handleModifyPassword = () => {
    if (isValidPassword && isValidPasswordConfirm) {
      modifyPassword(`${myinfo.user_id}`, {
        currentPWD: modify.now,
        newPWD: modify.new,
      })
        .then((result) => {
          setModify({
            now: '',
            new: '',
            re: '',
          });
          setResponseStatus('success modify password');
          setIsModalOpen(true);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setResponseStatus('unauthorized');
            setIsModalOpen(true);
          } else if (err.response.status === 409) {
            setResponseStatus('password conflict');
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
      case 'not changed':
        return (
          <>
            <p>변경된 정보가 없습니다.</p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      case 'invalid info':
        return (
          <>
            <p>
              사용자 이름은 최소 2자 이상, 최대 15자 이하, <br />
              소개는 최소 3자 이상, 최대 80자 이하여야 합니다.
            </p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
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
      case 'password conflict':
        return (
          <>
            <p>
              기존 비밀번호와 같습니다. <br />
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
        {/* <Illust badgeInfo={badgeInfo} /> */}
        <EditMyinfoSection>
          <TitleContainer>
            <h1>회원정보수정</h1>
            <Wave width='100%' height='100' fill={color.white} />
          </TitleContainer>
          <EditMyinfoBioContainer>
            <BadgeNameContainer>
              <MainBadgeImg
                src={Badges[myinfo.badge_id - 1]}
                alt='대표뱃지'
                onClick={() => setIsBadgeModalOpen(true)}
              />
              <InputForm
                value={myinfo.username}
                placeholder='사용자 이름'
                handleValue={onChangeUsername}
              />
            </BadgeNameContainer>
            <TextareaForm
              value={myinfo.bio}
              placeholder='사용자 소개'
              handleValue={onChangeBio}
              limit={80}
            />
            <Button content='저장하기' handler={handleUpdateMyinfo} />
          </EditMyinfoBioContainer>
          <Divider />
          {!myinfo.is_social ? (
            <>
              <ModifyPasswordContainer>
                <h4>비밀번호 변경</h4>
                {isExpanded ? (
                  <>
                    <InputForm
                      value={modify.now}
                      type='password'
                      placeholder='현재 비밀번호'
                      handleValue={handleInputPassword('now')}
                    />
                    <InputForm
                      value={modify.new}
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
                      value={modify.re}
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
            </>
          ) : null}
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
              handler={() => navigate(`/mypage/${myinfo.user_id}`)}
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
          <BadgeModal
            myinfo={myinfo}
            setMyinfo={setMyinfo}
            closeModal={setIsBadgeModalOpen}
          ></BadgeModal>
        ) : null}
      </EditMyinfoContainer>
    </Container>
  );
};

export default EditMyinfo;
