import { useEffect, useState } from 'react';
import { updateMyinfo } from '../apis';
import styled from 'styled-components';
import { boxShadow, color, device, radius } from '../styles';
import Button from './Button';
import Modal from '../components/Modal';
import Badges from '../assets/images/badges/badges';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 7999;
  background-color: ${color.backdrop};
`;

const BadgeModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 8999;
  width: 320px;
  height: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: ${radius};
  text-align: center;
  overflow: hidden;

  @media ${device.laptop} {
    width: 440px;
  }
`;

const CloseBtn = styled.button`
  position: relative;
  align-self: flex-end;
  width: 20px;
  height: 28px;
  z-index: 8999;
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
  padding-bottom: 5rem;
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

  &:after {
    content: '';
    position: fixed;
    top: 85%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 1) 80%
    );

    pointer-events: none;
  }
`;

const BadgeContainer = styled.div`
  position: relative;
  z-index: 99;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: ${(props) => props.outline};
  border-radius: 50%;
  cursor: pointer;
`;

const Badge = styled.img`
  src: ${(props) => props.src};
  position: relative;
  z-index: 99;
  width: 66px;
  height: 66px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  z-index: 999;
  width: 50%;
  display: flex;
  border-radius: ${radius};
  box-shadow: ${boxShadow};
`;

const BadgeModal = ({ myinfo, setMyinfo, closeModal }) => {
  const { badges } = myinfo;
  const [badgeInfo, setbadgeInfo] = useState([]);

  useEffect(() => {
    const { badges, badge_id } = myinfo;
    const badgeStatus = new Array(Badges.length - 1).fill();
    for (let i = 0; i < badgeStatus.length; i++)
      badgeStatus[i] = { id: i + 1, src: Badges[i] };
    badgeStatus.forEach((el, idx) => {
      if (badges.includes(idx + 1)) {
        if (idx + 1 === badge_id) {
          el.type = 'selected';
        } else {
          el.type = 'unselected';
        }
      } else {
        el.type = 'absent';
        el.src = `${Badges[Badges.length - 1]}`;
      }

      setbadgeInfo(badgeStatus);
    });
    // eslint-disable-next-line
  }, []);

  const handleMainBadge = (e) => {
    let idx = Number(e.target.alt);
    if (!badges.includes(idx)) {
      return;
    }
    const selectedBadges = badgeInfo
      .filter((el) => el.type === 'selected')
      .map((el) => el.id)[0];

    if (selectedBadges !== idx) {
      const change = [...badgeInfo];
      change[idx - 1] = {
        id: idx,
        type: 'selected',
        src: Badges[idx - 1],
      };
      change[selectedBadges - 1] = {
        id: selectedBadges,
        type: 'unselected',
        src: Badges[selectedBadges - 1],
      };
      setbadgeInfo(change);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('no status');

  const ModalMessage = ({ status, btnHandler = () => {} }) => {
    switch (status) {
      case 'success change badge':
        return (
          <>
            <p>
              뱃지를 변경하였습니다. <br />
            </p>
            <Button content='확인' handler={btnHandler} />
          </>
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

  const requestChangeBadge = () => {
    const payload = {
      badge_id: badgeInfo
        .filter((el) => el.type === 'selected')
        .map((el) => el.id)[0],
    };
    updateMyinfo(`${myinfo.user_id}`, payload)
      .then((result) => {
        setResponseStatus('success change badge');
        setIsModalOpen(true);
        setMyinfo({ ...myinfo, badge_id: payload.badge_id });
      })
      .catch((err) => {
        setResponseStatus('no status');
        setIsModalOpen(true);
      });
  };

  return (
    <>
      <Backdrop onClick={() => closeModal(false)}></Backdrop>
      <BadgeModalContainer>
        <CloseBtn onClick={() => closeModal(false)}>close</CloseBtn>
        <p>대표 뱃지를 선택해주세요</p>
        <BadgesViewer>
          {badgeInfo.map((el, idx) => {
            return (
              <BadgeContainer
                key={el.id}
                outline={
                  el.type === 'selected' ? `2px solid ${color.primary}` : null
                }
              >
                <Badge src={el.src} alt={el.id} onClick={handleMainBadge} />
              </BadgeContainer>
            );
          })}
        </BadgesViewer>
        <ButtonContainer>
          <Button content='저장' handler={requestChangeBadge} />
        </ButtonContainer>
      </BadgeModalContainer>
      {isModalOpen ? (
        <Modal closeModal={setIsModalOpen}>
          <ModalMessage
            status={responseStatus}
            btnHandler={() => setIsModalOpen(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default BadgeModal;
