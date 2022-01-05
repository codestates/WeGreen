import { useState } from "react";
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

const ModifyPasswordContainer = styled.div``;

const EditMyinfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleIsExpanded = () => setIsExpanded(!isExpanded);
  return (
    <EditMyinfoContainer>
      뱃지 <InputForm />
      <TextareaForm />
      <Button content="저장하기" />
      비밀번호 변경
      {isExpanded ? (
        <ModifyPasswordContainer>
          <InputForm />
          <InputForm />
          <InputForm />
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
