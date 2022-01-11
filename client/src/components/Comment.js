import styled from 'styled-components';
import { color, device } from '../styles';
import { ReactComponent as EditIcon } from '../assets/images/icon_edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/images/icon_delete.svg';

const CommentContainer = styled.div`
  border-bottom: 1px solid ${color.primaryBorder};
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
  background: none;
  color: ${color.grey};
  cursor: pointer;

  span {
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

const Comment = ({ comment }) => {
  return (
    <CommentContainer>
      <Bold>{comment.username}</Bold>
      <p>{comment.content}</p>
      <CaptionBtnContainer>
        <Caption>{comment.created_at}</Caption>
        <ButtonContainer>
          <IconBtn color='secondary'>
            <EditIcon width='20' height='20' fill={color.grey} />
            <span>수정</span>
          </IconBtn>
          <IconBtn color='warning'>
            <DeleteIcon width='20' height='20' fill={color.grey} />
            <span>삭제</span>
          </IconBtn>
        </ButtonContainer>
      </CaptionBtnContainer>
    </CommentContainer>
  );
};

export default Comment;
