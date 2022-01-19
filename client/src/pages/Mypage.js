import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserinfo, changeTitle } from '../actions';
import { requestMyinfo } from '../apis';
import styled from 'styled-components';
import { color, device, contentWidth, boxShadow } from '../styles';
import Illust from '../components/Illust';
import UserProfile from '../components/UserProfile';
import Tab from '../components/Tab';
import ChallengeCard from '../components/ChallengeCard';
import { ReactComponent as Wave } from '../assets/images/wave.svg';
import Badges from '../assets/images/badges/badges';

const Container = styled.div`
  @media ${device.laptop} {
    width: 100%;
    height: calc(100vh - 60px);
    min-height: 872px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${color.primaryLight};
  }
`;

const MypageContainer = styled.div`
  background-color: ${color.white};

  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: ${contentWidth};
    height: 100%;
    /* box-shadow: ${boxShadow}; */
  }
`;

const MyChallengesContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media ${device.laptop} {
    max-width: calc(${contentWidth} * 1 / 3);
    overflow-y: auto;
  }
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

const ContentSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
`;

const ChallengeListContainer = styled.div`
  width: 100%;
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

const EmptyMessage = styled.p`
  color: ${color.primary};
  font-size: 3rem;
  text-align: center;
  word-break: keep-all;
`;

const Mypage = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.userReducer);

  const [view, setView] = useState('ongoing');
  const [userInfo, setUserInfo] = useState(state.userInfo);
  const [challenges, setChallenges] = useState([{}]);
  const [badgeInfo, setBadgeInfo] = useState([]);

  const params = useParams();
  const userId = Number(params.id);

  const [isMine, setIsMine] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    requestMyinfo(`${userId}`)
      .then((result) => {
        setUserInfo(result.user_info);
        setChallenges(result.challenge_info.challenges);
        const { badges, selected_badges } = result.user_info;
        const TotalBadges = new Array(20).fill();
        for (let i = 0; i < TotalBadges.length; i++)
          TotalBadges[i] = { id: i + 1, src: Badges[i] };
        TotalBadges.forEach((el, idx) => {
          if (badges.includes(idx + 1)) {
            if (selected_badges.includes(idx + 1)) {
              el.type = 'selected';
            } else {
              el.type = 'unselected';
            }
          } else {
            el.type = 'absent';
            el.src = `${Badges[Badges.length - 1]}`;
          }
        });
        setBadgeInfo(TotalBadges);
      })
      .catch((err) => {
        navigate('/404');
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsMine(userId === Number(state.userInfo.user_id));
    dispatch(changeTitle('Userpage'));
    if (isMine) {
      dispatch(updateUserinfo(userInfo));
    }
    // eslint-disable-next-line
  }, [state]);

  const ongoingChallenges = challenges.filter((el) => el.is_finished === false);
  const finishedChallenges = challenges.filter((el) => el.is_finished === true);

  const successCounts = challenges.filter(
    (el) => el.is_finished === true && el.is_accomplished === true
  ).length;

  const tabContent = {
    ongoing: (
      <>
        {ongoingChallenges.length === 0 ? (
          <EmptyMessage>
            참여중인
            <br />
            챌린지가
            <br />
            없습니다
          </EmptyMessage>
        ) : (
          <ChallengeList>
            {ongoingChallenges.map((el) => (
              <ChallengeCard challenge={el} key={el.challenge_id} />
            ))}
          </ChallengeList>
        )}
      </>
    ),
    finished: (
      <>
        {finishedChallenges.length === 0 ? (
          <EmptyMessage>
            완료된
            <br />
            챌린지가
            <br />
            없습니다
          </EmptyMessage>
        ) : (
          <ChallengeList>
            {finishedChallenges.map((el) => (
              <ChallengeCard challenge={el} key={el.challenge_id} />
            ))}
          </ChallengeList>
        )}
      </>
    ),
  };

  return (
    <Container>
      <MypageContainer>
        <Illust badgeInfo={badgeInfo} />
        <MyChallengesContainer>
          <TitleContainer>
            <h1>{isMine ? '마이' : '사용자'}페이지</h1>
            <Wave width='100%' height='100' fill={color.white} />
          </TitleContainer>
          <ContentSection>
            <UserProfile
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              successCounts={successCounts}
              badgeInfo={badgeInfo}
              setBadgeInfo={setBadgeInfo}
            />
            <Tab
              tabInfo={[
                ['ongoing', '참여중인 챌린지'],
                ['finished', '완료된 챌린지'],
              ]}
              view={view}
              handleView={setView}
            />
            <ChallengeListContainer>{tabContent[view]}</ChallengeListContainer>
          </ContentSection>
        </MyChallengesContainer>
      </MypageContainer>
    </Container>
  );
};

export default Mypage;
