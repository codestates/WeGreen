import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../actions";
import axios from 'axios'
import styled from "styled-components";
import { color, device, contentWidth } from "../styles";
import Illust from "../components/Illust";
import UserProfile from "../components/UserProfile";
import Tab from "../components/Tab";
import ChallengeCard from "../components/ChallengeCard";
import { dummyUserInfo } from "../data/dummyUserInfo";

axios.defaults.withCredentials = true;

const MypageContainer = styled.div`
  background-color: ${color.primaryLight};
  padding: 0 1rem;

  @media ${device.laptop} {
    height: 100vh;
    max-width: ${contentWidth};
    margin: 0 auto;
    display: flex;
    gap: 1rem;
  }
`;

const MyChallengesContainer = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChallengeListContainer = styled.div`
  padding: 1rem;
  margin: 0 auto;

  @media ${device.laptop} {
    padding: 1rem 0;
    width: calc(${contentWidth} * 1 / 3);
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
    grid-template-columns: 1fr;
  }

`;

const Mypage = () => {
  const [view, setView] = useState("ongoing");
  const state = useSelector((state) => state.userReducer);
  const myinfo = state.userInfo
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyinfo = async () => {
      const myinfo = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/1`)
      .then(res => res.data.data.user_info)
      dispatch(updateUserinfo({
        username: myinfo.username,
        bio: myinfo.bio,
        badge_id: myinfo.badge_id,
        badges: myinfo.badges,
      }))
    }
    getMyinfo()
  // eslint-disable-next-line
  }, [])

  const ongoingChallenges = dummyUserInfo.challenge_info.filter(el => el.is_finished === false)
  const finishedChallenges = dummyUserInfo.challenge_info.filter(el => el.is_finished === true)

  const successCounts = dummyUserInfo.challenge_info.filter(el => el.is_accomplished === true).length

  const tabContent = {
    ongoing: (
        <ChallengeListContainer>
            <ChallengeList>
                {ongoingChallenges.map((el) => (
                    <ChallengeCard 
                      challenge={el}
                      key={el.challenge_id}  
                    />
                ))}
            </ChallengeList>
        </ChallengeListContainer>
      ),
    finished: (
      <ChallengeListContainer>
            <ChallengeList>
                {finishedChallenges.map((el) => (
                    <ChallengeCard 
                      challenge={el}
                      key={el.challenge_id}  
                    />
                ))}
            </ChallengeList>
      </ChallengeListContainer>
    ),
  };

  return (
    <MypageContainer>
      <Illust />
      <MyChallengesContainer>
        <UserProfile userInfo={myinfo} successCounts={successCounts}/>
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
