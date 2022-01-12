import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { color, device, radius } from '../styles';
import { ReactComponent as SendIcon } from '../assets/images/icon_send.svg';
import Comment from './Comment';
import Modal from './Modal';
import { createComment } from '../apis';

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
  background-color: ${color.primary};
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
      opacity: 0.1;
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

const ChallengeComments = ({ comments, isJoined }) => {
  const [content, setContent] = useState('');
  const challenge_id = useParams().id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInput = (event) => {
    setContent(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (isJoined) {
      createComment(challenge_id, content);
      setContent('');
    } else {
      setIsModalOpen(true);
    }
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
            <SendBtn onClick={handleSubmit}>
              <SendIcon width='20' height='20' fill={color.white} />
              <span>보내기</span>
            </SendBtn>
          </CommentInputContainer>
        </SendCommentContainer>
        <CommentsListContainer>
          <CommentsList>
            {comments.map((el) => (
              <Comment comment={el} key={el.comment_id} />
            ))}
          </CommentsList>
        </CommentsListContainer>
      </ChallengeCommentsContainer>
      {isModalOpen ? (
        <Modal closeModal={setIsModalOpen}>
          <p>챌린지에 참여한 사람만 댓글을 작성할 수 있습니다.</p>
        </Modal>
      ) : null}
    </>
  );
};

export default ChallengeComments;
