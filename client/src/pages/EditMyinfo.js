import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../actions";
import styled from "styled-components";
import { color, device, contentWidth } from "../styles";
import Illust from "../components/Illust";
import InputForm from "../components/InputForm";
import TextareaForm from "../components/TextareaForm";
import Button from "../components/Button";
import { ReactComponent as Wave } from '../assets/images/wave.svg';

const EditMyinfoContainer = styled.div`
  & > div {
    display: none;
  }
  & h4 {
    margin-bottom: 1rem;
  }

  @media ${device.laptop} {
    height: 100vh;
    max-width: ${contentWidth};
    margin: 0 auto;
    display: flex;

    & > div {
      display: block;
    }
  }
`;

const EditMyinfoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    width: calc(${contentWidth} * 1 / 3);
  }
`;

const TitleContainer = styled.div`
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
`;

const EditMyinfoBioContainer = styled.div`
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem
`;

const BadgeNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MainBadgeImg = styled.img``;

const ModifyPasswordContainer = styled.div`
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: .5rem;
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
`

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

  const [myinfo, setMyinfo] = useState(state.userInfo);
  const [modify, setModify] = useState({
    now: "",
    new: "",
    re: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  const onChangePassword = (val) => {
    handleInputPassword("new")(val);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    if (!passwordRegex.test(val)) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const onChangePasswordConfirm = (val) => {
    handleInputPassword("re")(val);
    if (modify.new !== val) {
      setIsValidPasswordConfirm(false);
    } else {
      setIsValidPasswordConfirm(true);
    }
    console.log('pw', modify.new, 'pwr', modify.re);
  };
  
  const handleInputPassword = (key) => (value) => {
    setModify({ ...modify, [key]: value });
  };
  const handleMyinfo = (key) => (value) => {
    setMyinfo({ ...myinfo, [key]: value });
  };

  const handleIsExpanded = () => setIsExpanded(!isExpanded);

  const dispatchUserinfo = () => {
    return dispatch(updateUserinfo({
      username: myinfo.username,
      bio: myinfo.bio,
    }))
  }

  return (
    <EditMyinfoContainer>
      <Illust />
      <EditMyinfoSection>
        <TitleContainer>
          <h1>회원정보수정</h1>
          <Wave width="100%" height="100" fill={color.white} />
        </TitleContainer>
        <EditMyinfoBioContainer>
          <BadgeNameContainer>
            <MainBadgeImg badgeId={1} alt="대표뱃지" />
            <InputForm
              defaultValue={myinfo.username}
              placeholder="사용자 이름"
              handleValue={handleMyinfo("username")}
            />
          </BadgeNameContainer>
          <TextareaForm
            defaultValue={myinfo.bio}
            placeholder="사용자 소개"
            handleValue={handleMyinfo("bio")}
          />
          <Button
            content="저장하기"
            handler={dispatchUserinfo}
          />
        </EditMyinfoBioContainer>
        <Divider />
        <ModifyPasswordContainer>
        <h4>비밀번호 변경</h4>
        {isExpanded ? (
          <>
            <InputForm
              type="password"
              placeholder="현재 비밀번호"
              handleValue={handleInputPassword("now")}
            />
            {isCorrectPassword ? null : (
              <InvalidMessage>
                *현재 비밀번호가 일치하지 않습니다.
              </InvalidMessage>
            )}
            <InputForm
              type="password"
              placeholder="새로운 비밀번호"
              handleValue={onChangePassword}
            />
            {isValidPassword ? null : (
              <InvalidMessage>
                *비밀번호는 최소 8자리 이상이어야 하며 영문자, 숫자,
                특수문자(!@#$%^&*?)가 1개 이상 사용되어야 합니다.
              </InvalidMessage>
            )}
            <InputForm
              type="password"
              placeholder="새로운 비밀번호 확인"
              handleValue={onChangePasswordConfirm}
            />
            {isValidPasswordConfirm ? null : (
              <InvalidMessage>*비밀번호가 다릅니다.</InvalidMessage>
            )}
            <Button content="비밀번호 변경" handler={handleIsExpanded} />
          </>
        ) : (
          <Button
            content="비밀번호 변경"
            color="tertiary"
            handler={handleIsExpanded}
          />
        )}
        </ModifyPasswordContainer>
        <Divider />
        <SignoutContainer>
          <h4>회원탈퇴</h4>
          <Button content="회원탈퇴" color="tertiary" />
        </SignoutContainer>
      </EditMyinfoSection>
    </EditMyinfoContainer>
  );
};

export default EditMyinfo;
