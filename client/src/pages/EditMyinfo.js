import { useState } from "react";
import { useLocation } from 'react-router';
import styled from "styled-components";
import { color, device, contentWidth } from "../styles";
import InputForm from "../components/InputForm";
import TextareaForm from "../components/TextareaForm";
import Button from "../components/Button";

const EditMyinfoContainer = styled.div`
  background-color: ${color.white};
  padding: 1rem;
  max-width: ${contentWidth};
  margin: 0 auto;

  @media ${device.laptop} {
    padding: 1rem 0;
  }
`;

const MainBadgeImg = styled.img``;

const ModifyPasswordContainer = styled.div``;

const EditMyinfo = () => {
  const { state } = useLocation()
  const [myinfo, setMyinfo] = useState(state)
  const [isExpanded, setIsExpanded] = useState(false);
  const [modify, setModify] = useState({
    now: '',
    new: '',
    re: '',
  });
  const handleInputPassword = (key) => (value) => {
    setModify({ ...modify, [key]: value });
  };
  console.log(modify)

  const handleIsExpanded = () => setIsExpanded(!isExpanded);
  return (
    <EditMyinfoContainer>
      <MainBadgeImg badgeId={myinfo.badge_id} alt="대표뱃지" />
      <InputForm 
        defaultValue={myinfo.username}
        placeholder="사용자 이름"
        handleValue={setMyinfo}
      />
      <TextareaForm />
      <Button content="저장하기" />
      비밀번호 변경
      {isExpanded ? (
        <ModifyPasswordContainer>
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
          <Button 
            content="비밀번호 변경"
            handler={handleIsExpanded}
          />
        </ModifyPasswordContainer>
      ) : (
        <Button 
          content="비밀번호 변경"
          color="tertiary"
          handler={handleIsExpanded}
        />
      )}
      회원탈퇴
      <Button
       content="회원탈퇴"
       color="tertiary"
      />
    </EditMyinfoContainer>
  );
};

export default EditMyinfo;
