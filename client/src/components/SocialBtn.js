import styled from 'styled-components';
import { color } from '../styles';

const SocialBtn = styled.button`
  width: 60px;
  height: 60px;
  margin: 0.5rem;
  border-radius: 50%;
  background-color: ${color.primaryLight};
  background-image: url(${(props) => props.image});
  border: ${(props) =>
    props.hasBorder ? `1px solid ${color.primaryBorder};` : 'none'};
  cursor: pointer;
`;

const Illust = ({ image, hasBorder = false }) => {
  return <SocialBtn image={image} hasBorder={hasBorder}></SocialBtn>;
};

export default SocialBtn;
