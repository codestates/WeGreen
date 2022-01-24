import { useState } from 'react';
import { updateMyBadges } from '../apis';
import styled from 'styled-components';
import { boxShadow, color, device, radius } from '../styles';
import Button from './Button';
import Modal from '../components/Modal';
import Loading from '../components/Loading'
import { ReactComponent as CrownIcon } from '../assets/images/icon_crown.svg';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 7999;
  background-color: ${color.backdrop};
`;

const BadgesModalContainer = styled.div`
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
  padding-bottom: 3.5rem;
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

const MainBadge = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  z-index: 899;
  width: 20px;
  height: 20px;
  padding: 4px;
  background-color: ${color.primary};
  border-radius: 50%;
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

const BadgesModal = ({
  userInfo,
  setUserInfo,
  closeModal,
  badgeInfo,
  setBadgeInfo,
}) => {
  const { badges, badge_id } = userInfo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('no status');

  const ModalMessage = ({ status, btnHandler = () => {} }) => {
    switch (status) {
      case 'wait response':
        return (
          <>
            <Loading theme='light' text='응답을 기다리는 중입니다.' />
          </>
        );
      case 'success change badges':
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

  const handleBadgeInfo = (e) => {
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
      setBadgeInfo(change);
    } else {
      const change = [...badgeInfo];
      change[idx - 1] = Object.assign({}, badgeInfo[idx - 1], {
        type: 'selected',
      });
      setBadgeInfo(change);
    }
  };

  const requestChangeSelectedBadges = () => {
    const payload = {
      badge_ids: badgeInfo
        .filter((el) => el.type === 'selected')
        .map((el) => el.id),
    };
    setResponseStatus('wait response')
    setIsModalOpen(true);
    updateMyBadges(payload)
      .then((result) => {
        setResponseStatus('success change badges');
        setUserInfo({ ...userInfo, selected_badges: payload.badge_ids });
      })
      .catch((err) => {
        setResponseStatus('no status');
      });
  };

  return (
    <>
      <Backdrop onClick={() => closeModal(false)}></Backdrop>
      <BadgesModalContainer>
        <CloseBtn onClick={() => closeModal(false)}>close</CloseBtn>
        <p>마이페이지 일러스트에 보여질 동식물을 선택해주세요</p>
        <BadgesViewer>
          {badgeInfo.map((el, idx) => {
            return (
              <BadgeContainer
                key={el.id}
                outline={
                  el.type === 'selected' ? `2px solid ${color.secondary}` : null
                }
              >
                <Badge src={el.src} alt={el.id} onClick={handleBadgeInfo} />
                {idx + 1 === badge_id ? (
                  <MainBadge>
                    <CrownIcon width='12' height='12' fill={color.tertiary} />
                  </MainBadge>
                ) : null}
              </BadgeContainer>
            );
          })}
        </BadgesViewer>
        <ButtonContainer>
          <Button content='저장' handler={requestChangeSelectedBadges} />
        </ButtonContainer>
      </BadgesModalContainer>
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

export default BadgesModal;
