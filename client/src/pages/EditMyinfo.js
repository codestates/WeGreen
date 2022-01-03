import { useState } from "react";
import styled from "styled-components";
import { color } from '../styles'
import InputForm from '../components/InputForm'
import TextareaForm from '../components/TextareaForm'
import Button from '../components/Button'

const EditMyinfoContainer = styled.div`
    background-color: ${color.white};
`

const EditMyinfo = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <EditMyinfoContainer>
            뱃지 <InputForm />
            <TextareaForm />
            <Button content="저장하기"/>
            비밀번호 변경
            {isExpanded ?
                <div>
                    <InputForm />
                    <InputForm />
                    <InputForm />
                    <Button content="비밀번호 변경"/>
                </div>
                : <Button content="비밀번호 변경"/>
            }
            회원탈퇴
            <Button content="회원탈퇴"/>
        </EditMyinfoContainer>
    )
};

export default EditMyinfo;