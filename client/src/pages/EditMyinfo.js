import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../actions";
import styled from "styled-components";
import { device, contentWidth } from "../styles";
import Illust from "../components/Illust";
import InputForm from "../components/InputForm";
import TextareaForm from "../components/TextareaForm";
import Button from "../components/Button";

const EditMyinfoContainer = styled.div`
  padding: 0 1rem;

  gap: 1rem;

  & > div {
    display: none;
  }

  @media ${device.laptop} {
    height: 100vh;
    max-width: ${contentWidth};
    margin: 0 auto;
    display: flex;
    gap: 1rem;

    & > div {
      display: block;
    }
  }
`;

const EditMyinfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${device.laptop} {
    padding: 1rem 0;
    width: calc(${contentWidth} * 1 / 3);
  }
`;

const EditMyinfoBioContainer = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid black;

  & > div {
    display: flex;
  }
`;

const MainBadgeImg = styled.img``;

const ModifyPasswordContainer = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid black;
`;

const SignoutContainer = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid black;
`

const EditMyinfo = () => {
  const state = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [modify, setModify] = useState({
    now: "",
    new: "",
    re: "",
  });
  const [myinfo, setMyinfo] = useState(state.userInfo);
  console.log(myinfo)

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
        <EditMyinfoBioContainer>
          <div>
            <MainBadgeImg badgeId={1} alt="대표뱃지" />
            <InputForm
              defaultValue={myinfo.username}
              placeholder="사용자 이름"
              handleValue={handleMyinfo("username")}
            />
          </div>
          <TextareaForm
            defaultValue={myinfo.bio}
            placeholder="사용자 소개"
            handleValue={handleMyinfo("nio")}
          />
          <Button
            content="저장하기"
            handler={dispatchUserinfo}
          />
        </EditMyinfoBioContainer>
        <ModifyPasswordContainer>
        비밀번호 변경
        {isExpanded ? (
          <>
            <InputForm
              type="password"
              placeholder="현재 비밀번호"
              handleValue={handleInputPassword("now")}
            />
            <InputForm
              type="password"
              placeholder="새로운 비밀번호"
              handleValue={handleInputPassword("new")}
            />
            <InputForm
              type="password"
              placeholder="새로운 비밀번호 확인"
              handleValue={handleInputPassword("re")}
            />
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
        <SignoutContainer>
          회원탈퇴
          <Button content="회원탈퇴" color="tertiary" />
        </SignoutContainer>
      </EditMyinfoSection>
    </EditMyinfoContainer>
  );
};

export default EditMyinfo;
