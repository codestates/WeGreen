import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { color, radius } from '../styles';
import { ReactComponent as EditIcon } from '../assets/images/icon_edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/images/icon_delete.svg';
import { ReactComponent as CancelIcon } from '../assets/images/icon_cancel.svg';
import { ReactComponent as ConfirmIcon } from '../assets/images/icon_confirm.svg';
import { editComment } from '../apis';
import Modal from './Modal';

const CommentContainer = styled.div`
  border-bottom: 1px solid ${color.primaryBorder};
`;

const EditContainer = styled.div`
  margin: ${(props) => (props.isEditable ? '1rem 0' : '0')};
  padding: 0 1rem;
  border: ${(props) =>
    props.isEditable ? `1px solid ${color.secondary}` : 'none'};
  border-radius: ${radius};
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  border: none;
  font-size: 1rem;
  resize: none;
  overflow: hidden;
  outline: none;
`;

const Bold = styled.p`
  font-weight: bold;
`;

const CaptionBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Caption = styled.p`
  margin: 0;
  color: ${color.grey};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: none;
  cursor: pointer;

  span {
    color: ${color.grey};
    font-weight: bold;
  }

  &:hover {
    span {
      color: ${(props) => color[props.color]};
    }
    svg {
      fill: ${(props) => color[props.color]};
    }
  }
`;

const SolidBtn = styled(IconBtn)`
  position: relative;
  background-color: ${(props) => color[props.color]};
  border-radius: ${radius};
  overflow: hidden;

  span {
    color: ${color.white};
    font-weight: normal;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover {
    span {
      color: ${color.white};
    }
    svg {
      fill: ${color.white};
    }
    &::after {
      opacity: 0.1;
    }
  }
`;

const ModalMessage = ({ status }) => {
  switch (status) {
    case 'network error':
      return (
        <p>
          서버에서 에러가 발생하여 댓글을 수정할 수 없습니다. <br />
          다시 시도해 주세요.
        </p>
      );
    default:
      return (
        <p>
          에러가 발생하여 댓글을 수정할 수 없습니다. <br />
          다시 시도해 주세요.
        </p>
      );
  }
};

const Comment = ({ comment, handleCommentEdit }) => {
  const textareaRef = useRef(null);
  const challenge_id = useParams().id;
  const state = useSelector((state) => state.userReducer);
  const myinfo = state.userInfo;
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAuthorized(myinfo.is_admin || myinfo.user_id === comment.user_id);
  }, []);

  const handleTextarea = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    editComment(challenge_id, comment.comment_id, content)
      .then((result) => {
        if (result.status === 500) {
          setResponseStatus('server error');
          setIsModalOpen(true);
          return;
        }
        if (result.status === 200) {
          setContent(result.data.data.content);
          handleCommentEdit(comment.comment_id, content);
          setIsEditable(false);
        }
      })
      .catch((err) => {
        setResponseStatus('');
        setIsModalOpen(true);
        return;
      });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [content]);

  return (
    <CommentContainer>
      <EditContainer isEditable={isEditable}>
        <Bold>{comment.username}</Bold>
        {isEditable ? (
          <ContentTextarea
            ref={textareaRef}
            value={content}
            onChange={handleTextarea}
          ></ContentTextarea>
        ) : (
          <p>{content}</p>
        )}
        <CaptionBtnContainer>
          <Caption>{comment.created_at}</Caption>
          {isAuthorized ? (
            <>
              {isEditable ? (
                <ButtonContainer>
                  <IconBtn
                    color='grey'
                    onClick={() => setIsEditable(!isEditable)}
                  >
                    <CancelIcon width='20' height='20' fill={color.grey} />
                    <span>취소</span>
                  </IconBtn>
                  <SolidBtn color='secondary' onClick={handleSubmit}>
                    <ConfirmIcon width='20' height='20' fill={color.white} />
                    <span>등록</span>
                  </SolidBtn>
                </ButtonContainer>
              ) : (
                <ButtonContainer>
                  <IconBtn
                    color='secondary'
                    onClick={() => setIsEditable(!isEditable)}
                  >
                    <EditIcon width='20' height='20' fill={color.grey} />
                    <span>수정</span>
                  </IconBtn>
                  <IconBtn color='warning'>
                    <DeleteIcon width='20' height='20' fill={color.grey} />
                    <span>삭제</span>
                  </IconBtn>
                </ButtonContainer>
              )}
            </>
          ) : null}
        </CaptionBtnContainer>
      </EditContainer>
      {isModalOpen ? (
        <Modal closeModal={setIsModalOpen}>
          <ModalMessage status={responseStatus} />
        </Modal>
      ) : null}
    </CommentContainer>
  );
};

export default Comment;
