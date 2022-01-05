import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color, contentWidth, radius } from "../styles";
import Button from "./Button";

const UserProfileContainer = styled.div`
  width: 70vw; /* 임시 */
  /* height: 10vh; 임시 */
  max-width: ${contentWidth};
  padding: 1rem;
  margin: 0 auto;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
  background-color: ${color.white};
  word-break: keep-all;
`;

const UserNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    gap: 1rem;
  }
`;

const MainBadgeImg = styled.img``;

const UserProfileLowContainer = styled.div`
  display: flex;
  justify-content: space-between;

`;

const UserProfile = ({ userInfo, successCounts }) => {
  const navigate = useNavigate();

  return (
    <UserProfileContainer>
      <UserNameContainer>
        <div>
          <MainBadgeImg badgeId={userInfo.badge_id} alt="대표뱃지" />
          <h3>{userInfo.username}</h3>
        </div>
        <Button
          width="20px"
          height="20px"
          content="*"
          handler={() => navigate("/editmyinfo")}
        />
      </UserNameContainer>
      <p>{userInfo.bio}</p>
      <UserProfileLowContainer>
        <div>모은 뱃지 3개</div>
        <div>성공한 챌린지 : {successCounts}개</div>
      </UserProfileLowContainer>
    </UserProfileContainer>
  );
};

export default UserProfile;
