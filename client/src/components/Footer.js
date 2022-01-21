import styled from 'styled-components';
import { color, device, contentWidth } from '../styles';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

const FooterContainer = styled.footer`
  background-color: ${color.primary};
  border-top: 1px solid ${color.primaryDark};
  padding: 1rem;
  color: ${color.white};
  @media ${device.laptop} {
    padding: 2rem 0;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media ${device.laptop} {
    grid-template-columns: 2fr 1fr 1fr;
    width: ${contentWidth};
    margin: 0 auto;
  }
`;

const LogoSection = styled.div`
  grid-column: 1 / span 2;
  border-bottom: 1px solid ${color.primaryBorder};
  p {
    color: ${color.primaryBorder};
    font-size: 0.85rem;
  }
  @media ${device.laptop} {
    grid-column: 1 / span 1;
    border-bottom: none;
  }
`;

const LinksContainer = styled.div`
  p {
    font-weight: bold;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  svg {
    transition: all 0.2s ease-in-out;
    margin-left: 0.25rem;
  }

  a:hover {
    color: ${color.secondary};
    svg {
      margin-left: 0.5rem;
    }
  }

  @media ${device.laptop} {
    border-left: 1px solid ${color.primaryBorder};
    padding-left: 1rem;

    ul {
      flex-direction: row;
      gap: 2rem;
    }

    a {
      word-break: keep-all;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <LogoSection>
          <Logo height='32px' />
          <p>Copyright © 2022 WeGreen</p>
        </LogoSection>
        <LinksContainer>
          <p>About WeGreen</p>
          <ul>
            <li>
              <a href='https://github.com/codestates/WeGreen/wiki'>Wiki</a>
            </li>
            <li>
              <a href='https://github.com/codestates/WeGreen'>Repository</a>
            </li>
          </ul>
        </LinksContainer>
        <LinksContainer>
          <p>Contact</p>
          <ul>
            <li>
              <a href='https://github.com/alskfl222'>신한결</a>
            </li>
            <li>
              <a href='https://github.com/alexjleee'>이지영</a>
            </li>
            <li>
              <a href='https://github.com/boraborayoon'>윤보라</a>
            </li>
            <li>
              <a href='https://github.com/hyungu1997'>강현규</a>
            </li>
          </ul>
        </LinksContainer>
      </ContentContainer>
    </FooterContainer>
  );
};

export default Footer;
