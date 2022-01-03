import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from '../styles'
import Button from "./Button";

const UserProfileContainer = styled.div`
    border: 1px solid ${color.primaryBorder};
`



const UserProfile = () => {
    const navigate = useNavigate()
    return (
        <UserProfileContainer>
            뱃지, 닉네임
            <Button width="20px" height="20px" content="icon" handler={() => navigate("/editmyinfo")} />
            자기소개
            뱃지 보기버튼
        </UserProfileContainer>
    )
};

export default UserProfile;