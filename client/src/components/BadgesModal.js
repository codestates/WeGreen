import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserinfo } from '../actions';
import { updateMyBadges } from '../apis';
import styled from 'styled-components';
import { color, device, radius } from '../styles';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: ${color.backdrop};
`;

const BadgesModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  width: 320px;
  height: 560px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;
  border-radius: ${radius};
  text-align: center;

  @media ${device.laptop} {
    width: 440px;
  }
`;

const CloseBtn = styled.button`
  position: relative;
  align-self: flex-end;
  width: 20px;
  height: 20px;
  z-index: 9999;
  background-color: transparent;
  text-indent: -999px;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 9px;
    left: 0;
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background-color: ${color.primaryBorder};
    transform: rotate(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 9px;
    left: 0;
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background-color: ${color.primaryBorder};
    transform: rotate(-45deg);
  }
`;

const BadgesViewer = styled.div`
  position: relative;
  padding: 1rem;
  z-index: 999;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  overflow-x: hidden;
  overflow-y: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const BadgeType = {
  absent: '',
  unselected: '1px dashed black',
  selected: '1px solid black',
};

const MainBadgeStyle = '2px';

const Badge = styled.img`
  position: relative;
  z-index: 99;
  width: 80px;
  height: 80px;
  border: ${(props) => props.border};
  border-width: ${(props) => props.isMain};
  border-radius: 40px;
`;

const BadgesModal = ({ closeModal }) => {
  const state = useSelector((state) => state.userReducer);
  const { badges, selected_badges, badge_id } = state.userInfo;

  const TotalBadges = new Array(20).fill();
  for (let i = 0; i < TotalBadges.length; i++)
    TotalBadges[i] = { id: i + 1, src: 'src' };
  TotalBadges.forEach((el, idx) => {
    if (badges.includes(idx + 1)) {
      if (selected_badges.includes(idx + 1)) {
        el.type = 'selected';
      } else {
        el.type = 'unselected';
      }
    } else {
      el.type = 'absent';
    }
  });

  const [badgeInfo, setbadgeInfo] = useState(TotalBadges);
  const dispatch = useDispatch();

  const handlebadgeInfo = (e) => {
    const idx = Number(e.target.alt);
    if (!badges.includes(idx)) {
      return;
    }

    const selectedBadges = badgeInfo
      .filter((el) => el.type === 'selected')
      .map((el) => el.id);

    if (selectedBadges.includes(idx)) {
      const change = [...badgeInfo];
      change[idx - 1] = Object.assign({}, badgeInfo[idx - 1], {
        type: 'unselected',
      });
      setbadgeInfo(change);
    } else {
      const change = [...badgeInfo];
      change[idx - 1] = Object.assign({}, badgeInfo[idx - 1], {
        type: 'selected',
      });
      setbadgeInfo(change);
    }
  };

  useEffect(() => {
    const result = {
      selected_badges: badgeInfo
        .filter((el) => el.type === 'selected')
        .map((el) => el.id),
    };
    dispatch(updateUserinfo(result));
  // eslint-disable-next-line
  }, [badgeInfo]);

  useEffect(() => {
    return () => {
      const result = {
        badge_ids: badgeInfo
          .filter((el) => el.type === 'selected')
          .map((el) => el.id),
      };
      updateMyBadges(`${state.userInfo.user_id}`, result).then(result => console.log(result))
    }
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <Backdrop onClick={() => closeModal(false)}></Backdrop>
      <BadgesModalContainer>
        <CloseBtn onClick={() => closeModal(false)}>close</CloseBtn>
        <BadgesViewer>
          {badgeInfo.map((el, idx) => {
            return (
              <Badge
                key={el.id}
                src={el.src}
                alt={el.id}
                isMain={idx + 1 === badge_id ? MainBadgeStyle : null}
                border={BadgeType[el.type]}
                onClick={handlebadgeInfo}
              />
            );
          })}
        </BadgesViewer>
      </BadgesModalContainer>
    </>
  );
};

export default BadgesModal;
