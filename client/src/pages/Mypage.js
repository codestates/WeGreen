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
import Loading from '../components/Loading';
import NoResult from '../components/NoResult';
import { ReactComponent as Wave } from '../assets/images/wave.svg';
import Badges from '../assets/images/badges/badges';

const Container = styled.div``;

const IllustContainer = styled.div`
  @media ${device.laptop} {
    position: fixed;
    left: calc((100vw - ${contentWidth}) / 2);
    width: calc(${contentWidth} / 3 * 2);
  }
`;

const MypageContainer = styled.div`
  width: 100%;
  background-color: ${color.primaryLight};
`;

const MypageInnerContainer = styled.div`
  background-color: ${color.white};
  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: ${contentWidth};
    min-height: calc(100vh - 60px);
    height: fit-content;
    margin: 0 auto;
  }
`;

const ColoredDiv = styled.div`
  background-color: ${color.primaryDark};
`;

const MyChallengesContainer = styled.div``;

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

const Mypage = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.userReducer);

  const [view, setView] = useState('ongoing');
  const [userInfo, setUserInfo] = useState({
    ...state.userInfo,
    badge_id: 21,
    badges: [],
  });
  const [challenges, setChallenges] = useState([{}]);
  const [badgeInfo, setBadgeInfo] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((err) => {
        navigate('/404');
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsMine(userId === Number(state.userInfo.user_id));
    dispatch(changeTitle(`WeGreen | 마이페이지 - ${userInfo.username}`));
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
        {isLoading ? (
          <Loading theme='light' text='참여중인 챌린지를 불러오는 중입니다.' />
        ) : null}
        {!isLoading && ongoingChallenges.length === 0 ? (
          <NoResult theme='light' text='참여중인 챌린지가 없습니다.' />
        ) : null}
        {isLoading ? null : (
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
        {isLoading ? (
          <Loading theme='light' text='완료된 챌린지를 불러오는 중입니다.' />
        ) : null}
        {!isLoading && finishedChallenges.length === 0 ? (
          <NoResult theme='light' text='완료된 챌린지가 없습니다.' />
        ) : null}
        {isLoading ? null : (
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
      <IllustContainer>
        <Illust badgeInfo={badgeInfo} isMine={isMine} />
      </IllustContainer>
      <MypageContainer>
        <MypageInnerContainer>
          <ColoredDiv />
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
              <ChallengeListContainer>
                {tabContent[view]}
              </ChallengeListContainer>
            </ContentSection>
          </MyChallengesContainer>
        </MypageInnerContainer>
      </MypageContainer>
    </Container>
  );
};

export default Mypage;
