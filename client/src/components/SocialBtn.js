import styled from 'styled-components';
import { color } from '../styles';

const SocialBtn = styled.button`
  width: 60px;
  height: 60px;
  margin: 0.5rem;
  border-radius: 50%;
  background-color: ${color.primaryLight};
`;

const Illust = () => {
  return <SocialBtn></SocialBtn>;
};

export default SocialBtn;
