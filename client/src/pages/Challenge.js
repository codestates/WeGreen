import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTitle } from '../actions';
import {
  requestChallenge,
  deleteChallenge,
  joinChallenge,
  checkin,
} from '../apis';
import styled from 'styled-components';
import { color, contentWidth, device } from '../styles';
import Tab from '../components/Tab';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ChallengeInfo from '../components/ChallengeInfo';
import ChallengeCheckin from '../components/ChallengeCheckin';
import ChallengeComments from '../components/ChallengeComments';
import { ReactComponent as EditIcon } from '../assets/images/icon_edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/images/icon_delete.svg';
import { ReactComponent as PersonIcon } from '../assets/images/icon_person.svg';
import Badges from '../assets/images/badges/badges';
import { dummyChallenge, dummyComments, TODAY } from '../data/dummyData';

const OuterContainer = styled.div`
  @media ${device.laptop} {
    width: 100%;
    height: calc(100vh - 60px);
    background-color: ${color.primaryLight};
  }
`;

const ChallengeContainer = styled.div`
  background-color: ${color.primaryLight};
`;

const CommonContainer = styled.div`
  position: relative;
  padding: 2rem 1rem;

  @media ${device.laptop} {
    width: ${contentWidth};
    margin: 0 auto;
    padding: 2rem 0;
    text-align: center;
  }
`;

const EditBtn = styled.button`
  float: right;
  cursor: pointer;

  @media ${device.laptop} {
    float: none;
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;

const DeleteBtn = styled.button`
  float: right;
  cursor: pointer;

  @media ${device.laptop} {
    float: none;
    position: absolute;
    top: 2rem;
    right: 0;
  }
`;

const Title = styled.h1`
  @media ${device.laptop} {
    padding: 0 2rem;
    word-wrap: break-word;
  }
`;

const Caption = styled.p`
  color: ${color.secondaryDark};
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${color.white};
  border-top-right-radius: 60px;

  h3 {
    margin-left: 1rem;
    margin-bottom: 1rem;
    color: ${color.primary};
  }

  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    width: ${contentWidth};
    margin: 0 auto;
    padding: 0 0 3rem 0;
    background-color: ${color.primaryLight};
    border-radius: 0;
  }
`;

const GridSpan = styled.div`
  grid-row: 1 / 3;
  grid-column: 2;
`;

const SuccessChallengeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ObtainedBadge = styled.img`
  width: 200px;
  object-fit: contain;
`;

const Challenge = () => {
  const dispatch = useDispatch();
  dispatch(changeTitle('Challenge'));

  const params = useParams();
  const loginState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const [view, setView] = useState('info');
  const [challengeInfo, setChallengeInfo] = useState(dummyChallenge);
  const [checkinInfo, setCheckinInfo] = useState({
    checkin_count: 0,
    checkin_log: [],
    is_accomplished: false,
  });
  const [comments, setComments] = useState(dummyComments);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('no status');

  const checkinLog = checkinInfo.checkin_log.map((el) => {
    const log = new Date(el);
    return log.toString();
  });

  const startedAt = new Date(challengeInfo.started_at);
  const finishedAt = new Date(challengeInfo.started_at);
  finishedAt.setDate(startedAt.getDate() + 6);

  const isAdmin = loginState.userInfo.is_admin;
  const isAuthor = loginState.userInfo.user_id === challengeInfo.author;
  const isCheckined = checkinLog.includes(TODAY.toString());
  const isStarted = startedAt <= TODAY;
  const isFinished = finishedAt < TODAY;

  useEffect(() => {
    requestChallenge(params.id).then((result) => {
      setChallengeInfo(result.challenge_info);
      setCheckinInfo(result.checkin_info);
      setComments(result.comments);
    });
    // eslint-disable-next-line
  }, []);

  const moveEditChallenge = () => {
    navigate(`/editchallenge/${challengeInfo.challenge_id}`, {
      state: challengeInfo,
    });
  };

  const handleDeleteChallengeModal = () => {
    setResponseStatus('confirm delete challenge');
    setIsModalOpen(true);
  };

  const handleDeleteChallenge = () => {
    deleteChallenge(`${challengeInfo.challenge_id}`)
      .then((result) => {
        setResponseStatus('success delete challenge');
      })
      .catch((err) => {
        setResponseStatus('no status');
      });
  };

  const handleJoinChallengeModal = () => {
    setResponseStatus('confirm join challenge');
    setIsModalOpen(true);
  };

  const handleJoinChallenge = () => {
    joinChallenge(challengeInfo.challenge_id)
      .then((result) => {
        setResponseStatus('success join challenge');
      })
      .catch((err) => {
        setResponseStatus('no status');
      });
  };

  const handleCheckinModal = () => {
    setResponseStatus('confirm checkin');
    setIsModalOpen(true);
  };

  const handleCheckin = () => {
    checkin(challengeInfo.challenge_id)
      .then((result) => {
        setCheckinInfo({
          ...checkinInfo,
          checkin_count: checkinInfo.checkin_count + 1,
          ...result.data,
        });
        if (checkinInfo.is_accomplished === result.data.is_accomplished) {
          setResponseStatus('success checkin');
        } else {
          setResponseStatus('success challenge');
        }
      })
      .catch((err) => {
        setResponseStatus('duplicate checkin');
      });
  };

  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  const throttle = (func, waits) => {
    let lastFunc; // timer id of last invocation
    let lastRan; // time stamp of last invocation
    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= waits) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, waits - (Date.now() - lastRan));
      }
    };
  };

  const handleCommentEdit = (commentId, content) => {
    const targetIdx = comments.findIndex((el) => el.comment_id === commentId);
    const targetComment = comments.filter(
      (el) => el.comment_id === commentId
    )[0];
    const editedComment = { ...targetComment, content };
    setComments([
      ...comments.slice(0, targetIdx),
      editedComment,
      ...comments.slice(targetIdx + 1),
    ]);
  };

  const handleCommentDelete = (commentId) => {
    const newComments = comments.filter((el) => el.comment_id !== commentId);
    setComments(newComments);
    console.log('deleted comment', newComments);
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }
    window.addEventListener('resize', throttle(handleResize, 500));
    return () =>
      window.removeEventListener('resize', throttle(handleResize, 500));
  }, []);

  const ModalMessage = ({ status, btnHandler = () => {} }) => {
    switch (status) {
      case 'unauthorized':
        return (
          <>
            <p>
              현재 비밀번호가 일치하지 않거나 <br />
              로그인이 만료되었습니다. <br />
              다시 시도해주세요.
            </p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      case 'confirm delete challenge':
        return (
          <>
            <p>이 챌린지를 삭제하시겠습니까?</p>
            <Button
              content='네, 삭제하겠습니다'
              handler={handleDeleteChallenge}
            />
          </>
        );
      case 'success delete challenge':
        return (
          <>
            <p>챌린지 삭제가 완료되었습니다.</p>
            <Button content='확인' handler={() => navigate('/challenges')} />
          </>
        );
      case 'confirm join challenge':
        return (
          <>
            <p>챌린지에 참가하시겠습니까?</p>
            <Button
              content='네, 참가하겠습니다'
              handler={handleJoinChallenge}
            />
          </>
        );
      case 'success join challenge':
        return (
          <>
            <p>챌린지에 참가하셨습니다.</p>
            <Button content='확인' handler={() => window.location.reload()} />
          </>
        );
      case 'confirm checkin':
        return (
          <>
            <p>체크인하시겠습니까?</p>
            <Button content='네, 체크인하겠습니다' handler={handleCheckin} />
          </>
        );
      case 'success checkin':
        return (
          <>
            <p>체크인에 성공하셨습니다.</p>
            <Button content='확인' handler={() => window.location.reload()} />
          </>
        );
      case 'duplicate checkin':
        return (
          <>
            <p>이미 체크인 하셨습니다.</p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      case 'success challenge':
        return (
          <SuccessChallengeContainer>
            <ObtainedBadge src={Badges[checkinInfo.obtained_badge - 1]} />
            <p>
              축하합니다! <br /> 챌린지에 성공하셨습니다. <br /> 뱃지를
              획득하셨습니다.
            </p>
            <Button
              content='뱃지 보러가기'
              handler={() => navigate(`/mypage/${loginState.userInfo.user_id}`)}
            />
          </SuccessChallengeContainer>
        );
      default:
        return (
          <>
            <p>
              에러가 발생하였습니다. <br />
              다시 시도해 주세요.
            </p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
    }
  };

  const tabContent = {
    info: <ChallengeInfo challengeInfo={challengeInfo}></ChallengeInfo>,
    checkin: (
      <ChallengeCheckin
        challengeInfo={challengeInfo}
        checkinInfo={checkinInfo}
      ></ChallengeCheckin>
    ),
    comments: (
      <ChallengeComments
        comments={comments}
        handleCommentsUpdate={setComments}
        handleCommentEdit={handleCommentEdit}
        handleCommentDelete={handleCommentDelete}
        isJoined={challengeInfo.is_joined}
      ></ChallengeComments>
    ),
  };

  return (
    <OuterContainer>
      <ChallengeContainer>
        <CommonContainer>
          {isAdmin || isAuthor ? (
            isAdmin || (!isStarted && challengeInfo.join_count < 2) ? (
              <>
                <DeleteBtn onClick={handleDeleteChallengeModal}>
                  <DeleteIcon width='20' height='20' fill={color.secondary} />
                </DeleteBtn>
                <EditBtn onClick={moveEditChallenge}>
                  <EditIcon width='20' height='20' fill={color.secondary} />
                </EditBtn>
              </>
            ) : (
              <>
                <EditBtn>
                  <EditIcon width='20' height='20' fill={color.grey} />
                </EditBtn>
                <DeleteBtn>
                  <DeleteIcon width='20' height='20' fill={color.grey} />
                </DeleteBtn>
              </>
            )
          ) : null}
          <Title>{challengeInfo.name}</Title>
          <Caption>
            <PersonIcon width='20' height='20' fill={color.secondaryDark} />
            {challengeInfo.join_count}명 참여중
          </Caption>
          {challengeInfo.is_joined ? (
            isStarted && !isCheckined && !isFinished ? (
              <Button content='챌린지 체크인' handler={handleCheckinModal} />
            ) : (
              <Button
                color={color.black}
                disabled={true}
                content='챌린지 체크인'
              />
            )
          ) : isStarted ? (
            <Button
              color={color.black}
              disabled={true}
              content='챌린지 참여하기'
            />
          ) : (
            <Button
              content='챌린지 참여하기'
              handler={handleJoinChallengeModal}
            />
          )}
          {windowWidth < 1024 ? (
            <Tab
              tabInfo={[
                ['info', '정보'],
                ['checkin', '체크인'],
                ['comments', '댓글'],
              ]}
              view={view}
              handleView={setView}
            />
          ) : null}
        </CommonContainer>
        <ContentContainer>
          {windowWidth < 1024 ? (
            tabContent[view]
          ) : (
            <>
              <div>
                <h3>정보</h3>
                <ChallengeInfo challengeInfo={challengeInfo} />
              </div>
              <GridSpan>
                <h3>댓글</h3>
                <ChallengeComments
                  comments={comments}
                  handleCommentsUpdate={setComments}
                  handleCommentEdit={handleCommentEdit}
                  handleCommentDelete={handleCommentDelete}
                  isJoined={challengeInfo.is_joined}
                />
              </GridSpan>
              <div>
                <h3>체크인</h3>
                <ChallengeCheckin
                  challengeInfo={challengeInfo}
                  checkinInfo={checkinInfo}
                />
              </div>
            </>
          )}
        </ContentContainer>
      </ChallengeContainer>
      {isModalOpen ? (
        <Modal closeModal={setIsModalOpen}>
          <ModalMessage
            obtained_badge={checkinInfo.obtained_badge || null}
            status={responseStatus}
            btnHandler={() => setIsModalOpen(false)}
          />
        </Modal>
      ) : null}
    </OuterContainer>
  );
};

export default Challenge;
