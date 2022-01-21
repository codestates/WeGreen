import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { color, device, radius } from '../styles';
import { ReactComponent as SendIcon } from '../assets/images/icon_send.svg';
import Comment from './Comment';
import Modal from './Modal';
import Button from './Button';
import Loading from '../components/Loading';
import NoResult from '../components/NoResult';
import { createComment, requestComments } from '../apis';

const ChallengeCommentsContainer = styled.div`
  background-color: ${color.white};
  border-radius: ${radius};
`;

const SendCommentContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: ${color.primary};
  border-radius: 30px 30px 0 0;

  @media ${device.laptop} {
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    background-color: transparent;
  }
`;

const CommentInputContainer = styled.div`
  position: relative;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 1rem;
  border-radius: ${radius};
  border: none;
  font-size: 1rem;

  @media ${device.laptop} {
    border: 1px solid ${color.primaryBorder};
  }
`;

const SendBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 34px;
  height: 34px;
  background-color: ${(props) =>
    props.content === '' ? color.greyLight : color.primary};
  border-radius: 17px;
  cursor: pointer;

  span {
    display: none;
    color: ${color.white};
  }

  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    padding: 0.75rem;

    span {
      display: inline-block;
      font-size: 1rem;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    border-radius: 17px;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover {
    &::after {
      ${(props) => (props.content === '' ? 0 : 0.1)};
    }
  }
`;

const CommentsListContainer = styled.div`
  padding-bottom: 3rem;

  @media ${device.laptop} {
    padding-bottom: 0;
  }
`;

const CommentsList = styled.ul`
  @media ${device.laptop} {
    padding: 0 1rem 1rem;
  }
`;

const ModalMessage = ({ status }) => {
  const navigate = useNavigate();
  switch (status) {
    case 'login required':
      return (
        <>
          <p>
            챌린지 참여자만 댓글을 작성할 수 있습니다.
            <br />
            먼저 로그인을 진행해 주세요.
          </p>
          <Button
            content='로그인하러 가기'
            handler={() => navigate('/login')}
          ></Button>
        </>
      );
    case 'join required':
      return <p>챌린지 참여자만 댓글을 작성할 수 있습니다.</p>;
    case 'server error':
      return (
        <p>
          서버에서 에러가 발생하여 댓글을 작성할 수 없습니다. <br />
          다시 시도해 주세요.
        </p>
      );
    default:
      return (
        <p>
          에러가 발생하여 댓글을 작성할 수 없습니다. <br />
          다시 시도해 주세요.
        </p>
      );
  }
};

const ChallengeComments = ({
  comments,
  handleCommentsUpdate,
  handleCommentEdit,
  handleCommentDelete,
  isJoined,
  loadingInfo,
}) => {
  const state = useSelector((state) => state.userReducer);
  const isLogin = state.isLogin;
  const userInfo = state.userInfo;

  const [content, setContent] = useState('');
  const challenge_id = useParams().id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('');

  const handleInput = (event) => {
    setContent(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!isLogin) {
      setResponseStatus('login required');
      setIsModalOpen(true);
      return;
    }
    if (!isJoined && !userInfo.is_admin) {
      setResponseStatus('join required');
      setIsModalOpen(true);
      return;
    }
    if (content === '') {
      return;
    }

    loadingInfo.setIsLoading(true);
    createComment(challenge_id, content)
      .then((result) => {
        loadingInfo.setIsLoading(false);
        if (result.status === 500) {
          setResponseStatus('server error');
          setIsModalOpen(true);
          return;
        }
        if (result.status === 201) {
          setContent('');
          return requestComments(challenge_id).then((result) => {
            handleCommentsUpdate(result.data.data.comments);
            if (result.data.data.comments.length === 0)
              loadingInfo.setHasNoResult(true);
          });
        }
      })
      .catch((err) => {
        setResponseStatus('');
        setIsModalOpen(true);
        return;
      });
  };

  return (
    <>
      <ChallengeCommentsContainer>
        <SendCommentContainer>
          <CommentInputContainer>
            <CommentInput
              placeholder='댓글을 입력해주세요'
              value={content}
              onChange={handleInput}
              onKeyPress={handleKeyPress}
            ></CommentInput>
            <SendBtn onClick={handleSubmit} content={content}>
              <SendIcon width='20' height='20' fill={color.white} />
              <span>보내기</span>
            </SendBtn>
          </CommentInputContainer>
        </SendCommentContainer>
        <CommentsListContainer>
          {loadingInfo.isLoading ? (
            <Loading theme='light' text='댓글을 불러오는 중입니다.' />
          ) : null}
          {comments.length === 0 && !loadingInfo.isLoading ? (
            <NoResult theme='light' text='작성된 댓글이 없습니다.' />
          ) : null}
          <CommentsList>
            {loadingInfo.isLoading
              ? null
              : comments.map((el) => (
                  <Comment
                    comment={el}
                    key={el.comment_id}
                    handleCommentEdit={handleCommentEdit}
                    handleCommentDelete={handleCommentDelete}
                  />
                ))}
          </CommentsList>
        </CommentsListContainer>
      </ChallengeCommentsContainer>
      {isModalOpen ? (
        <Modal closeModal={setIsModalOpen}>
          <ModalMessage status={responseStatus} />
        </Modal>
      ) : null}
    </>
  );
};

export default ChallengeComments;
