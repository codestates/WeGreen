import { useState } from "react";
import styled from "styled-components";
import { color, device, contentWidth } from "../styles";
import Illust from "../components/Illust";
import UserProfile from "../components/UserProfile";
import Tab from "../components/Tab";
import ChallengeCard from "../components/ChallengeCard";
import { dummyUserInfo } from "../data/dummyUserInfo";

const MypageContainer = styled.div`
  background-color: ${color.primaryLight};
`;

const MyinfoSection = styled.section`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-align: center;
`
const MyChallengesContainer = styled.section``

const ChallengeListContainer = styled.div`
  padding: 1rem;
  max-width: ${contentWidth};
  margin: 0 auto;

  @media ${device.laptop} {
    padding: 1rem 0;
  }
`;

const ChallengeList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media ${device.mobileLandscape} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Mypage = () => {
  const [view, setView] = useState("ongoing");

  const ongoingChallenges = dummyUserInfo.challenge_info.filter(el => el.is_finished === false)
  const finishedChallenges = dummyUserInfo.challenge_info.filter(el => el.is_finished === true)

  const successCounts = dummyUserInfo.challenge_info.filter(el => el.is_accomplished === true).length

  const tabContent = {
    ongoing: (
        <ChallengeListContainer>
            <ChallengeList>
                {ongoingChallenges.map((el) => (
                    <ChallengeCard challenge={el} />
                ))}
            </ChallengeList>
        </ChallengeListContainer>
      ),
    finished: (
      <ChallengeListContainer>
            <ChallengeList>
                {finishedChallenges.map((el) => (
                    <ChallengeCard challenge={el} />
                ))}
            </ChallengeList>
      </ChallengeListContainer>
    ),
  };

  return (
    <MypageContainer>
      <MyinfoSection>
        <Illust />
        <UserProfile userInfo={dummyUserInfo.user_info} successCounts={successCounts}/>
      </MyinfoSection>
      <MyChallengesContainer>
        <Tab
          tabInfo={[
            ["ongoing", "참여중인 챌린지"],
            ["finished", "완료된 챌린지"],
          ]}
          handleView={setView}
        />
        {tabContent[view]}
      </MyChallengesContainer>
    </MypageContainer>
  );
};

export default Mypage;
