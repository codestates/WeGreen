import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { color, device, radius, boxShadow } from '../styles';
import Button from './Button';
import BadgesModal from './BadgesModal';
import { ReactComponent as SettingIcon } from '../assets/images/icon_setting.svg';

const UserProfileContainer = styled.div`
  position: relative;
  top: -2rem;
  width: 100%; /* 임시 */
  min-width: 240px; /* 임시 */
  max-width: 400px; /* 임시 */
  padding: 1rem;
  border-radius: ${radius};
  background-color: ${color.white};
  box-shadow: ${boxShadow};
  word-break: keep-all;

  @media ${device.laptop} {
    top: 0;
  }
`;

const UserNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    gap: 1rem;
  }
`;

const MainBadgeImg = styled.img``;

const SettingBtn = styled.button`
  position: relative;
  width: 40px;
  height: 27px;
  background-color: ${color.secondary};
  border-radius: 17px;
  cursor: pointer;

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

const UserProfileLowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const UserProfile = ({ userInfo, setUserInfo, successCounts }) => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.userReducer);

  const params = useParams();
  const userId = Number(params.id);

  const [isMine, setIsMine] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);

  useEffect(() => {
    setIsMine(userId === Number(state.userInfo.user_id));
    // eslint-disable-next-line
  }, [state]);

  const totalBadgesText = `모은 뱃지 ${userInfo.badges.length}개`;

  return (
    <UserProfileContainer>
      <UserNameContainer>
        <div>
          <MainBadgeImg badgeId={userInfo.badge_id} alt='대표뱃지' />
          <h3>{userInfo.username}</h3>
        </div>
        {isMine ? (
          <SettingBtn onClick={() => navigate('/editmyinfo')}>
            <SettingIcon width='20' height='20' fill={color.white} />
          </SettingBtn>
        ) : null}
      </UserNameContainer>
      <p>{userInfo.bio}</p>
      <UserProfileLowContainer>
        {isMine ? (
          <Button
            width='140px'
            height='30px'
            content={totalBadgesText}
            handler={() => setIsBadgesModalOpen(true)}
          />
        ) : (
          totalBadgesText
        )}
        <div>성공한 챌린지 : {successCounts}개</div>
      </UserProfileLowContainer>
      {isBadgesModalOpen ? (
        <BadgesModal
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          closeModal={setIsBadgesModalOpen}
        ></BadgesModal>
      ) : null}
    </UserProfileContainer>
  );
};

export default UserProfile;
