import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { toPng } from 'html-to-image';
import { color, device } from '../styles';
import { ReactComponent as Background } from '../assets/images/illust/background.svg';
import { ReactComponent as Palm } from '../assets/images/illust/palm.svg';
import { ReactComponent as Puma } from '../assets/images/illust/puma.svg';
import { ReactComponent as Monstera } from '../assets/images/illust/monstera.svg';
import { ReactComponent as Stag } from '../assets/images/illust/stag.svg';
import { ReactComponent as Philodendron } from '../assets/images/illust/philodendron.svg';
import { ReactComponent as Guzmania } from '../assets/images/illust/guzmania.svg';
import { ReactComponent as RedPanda } from '../assets/images/illust/redpanda.svg';
import { ReactComponent as Fox } from '../assets/images/illust/fox.svg';
import { ReactComponent as Musa } from '../assets/images/illust/musa.svg';
import { ReactComponent as PhilodendronSmall } from '../assets/images/illust/philodendron-small.svg';
import { ReactComponent as Penstemon } from '../assets/images/illust/penstemon.svg';
import { ReactComponent as Rafflesia } from '../assets/images/illust/rafflesia.svg';
import { ReactComponent as RedFlowers } from '../assets/images/illust/red-flowers.svg';
import { ReactComponent as Vine } from '../assets/images/illust/vine.svg';
import { ReactComponent as Toucan } from '../assets/images/illust/toucan.svg';
import { ReactComponent as Slowth } from '../assets/images/illust/slowth.svg';
import { ReactComponent as Snake } from '../assets/images/illust/snake.svg';
import { ReactComponent as Tamarin } from '../assets/images/illust/tamarin.svg';
import { ReactComponent as BabyBear } from '../assets/images/illust/baby-bear.svg';
import { ReactComponent as Butterfly } from '../assets/images/illust/butterfly.svg';
import { ReactComponent as DownloadIcon } from '../assets/images/icon_download.svg';

const leaf = keyframes`
0% {
  transform: rotate(0deg);
}
40% {
  transform: rotate(3deg);
}
100% {
  transform: rotate(0deg);
}
`;

const leaf2 = keyframes`
0% {
  transform: rotate(0deg);
}
40% {
  transform: rotate(2deg);
}
100% {
  transform: rotate(0deg);
}
`;

const head = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-1deg);
  }
  40% {
    transform: rotate(0deg);
  }
`;

const head2 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-2deg);

  }
  40% {
    transform: rotate(0deg);
  }
`;

const arm = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-1deg) translateX(-2%);
  }
  40% {
    transform: rotate(0deg);
  }
`;

const body = keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: rotate(1deg);
  }
  50% {
    transform: translateX(0) translateY(0);
  }
`;

const fly = keyframes`
0% {
  transform: translateX(-25%) scaleY(0.9);
}
10% {
  transform: translateX(-5%) scaleY(1);
}
20% {
  transform: translateX(25%) scaleY(0.9);
}
30% {
  transform: translateX(30%) scaleY(1.1);
}
40% {
  transform: translateX(30%) scaleY(1.1);
}
50% {
  transform: translateX(35%) scaleY(1.1);
}
60% {
  transform: translateX(90%) scaleY(0.9);
}
70% {
  transform: translateX(100%) scaleY(1);
}
100% {
  transform: translateX(100%) scaleY(1) ;
}
`;

const StyledPalm = styled(Palm)`
  transform: translateX(-5%);
  #palm-leaf-1 {
    animation: ${leaf} infinite 8s ease-in-out;
    transform-origin: bottom left;
  }
  #palm-leaf-2 {
    animation: ${leaf} infinite 6s ease-in-out;
    transform-origin: bottom left;
  }
`;

const StyledPuma = styled(Puma)`
  #puma-head {
    animation: ${head} infinite 8s ease-in-out;
    transform-origin: bottom left;
  }
`;

const StyledMonstera = styled(Monstera)`
  transform: translateX(8%);
  #monstera-leaf-1 {
    animation: ${leaf} infinite 6s ease-in-out;
    transform-origin: bottom right;
  }
  #monstera-leaf-2 {
    animation: ${leaf} infinite 8s ease-in-out;
    transform-origin: bottom right;
  }
`;

const StyledStag = styled(Stag)`
  transform: translateX(8%);
  #stag-head {
    animation: ${head2} infinite 8s 2.5s ease-in-out;
    transform-origin: center right;
  }
`;

const StyledPhilodendron = styled(Philodendron)`
  #philodendron-leaf-1 {
    animation: ${leaf} infinite 8s ease-in-out;
    transform-origin: bottom right;
  }
  #philodendron-leaf-2 {
    animation: ${leaf} infinite 6s ease-in-out;
    transform-origin: bottom right;
  }
  #philodendron-leaf-3 {
    animation: ${leaf} infinite 10s ease-in-out;
    transform-origin: bottom right;
  }
`;

const StyledGuzmania = styled(Guzmania)`
  #guzmania-1 {
    animation: ${leaf2} infinite 8s ease-in-out;
    transform-origin: bottom right;
  }
  #guzmania-2 {
    animation: ${leaf2} infinite 6s ease-in-out;
    transform-origin: bottom right;
  }
`;

const StyledRedPanda = styled(RedPanda)`
  #redpanda-head {
    animation: ${head} infinite 8s 2s ease-in-out;
    transform-origin: bottom left;
  }
  #redpanda-arm-back {
    animation: ${arm} infinite 8s 2s ease-in-out;
    transform-origin: top left;
  }

  #redpanda-arm-front {
    animation: ${arm} infinite 8s 2s ease-in-out;
    transform-origin: top left;
  }
`;

const StyledFox = styled(Fox)`
  #fox-head {
    animation: ${head} infinite 6s 1s ease-in-out;
    transform-origin: bottom right;
  }
`;

const StyledMusa = styled(Musa)`
  transform: translateX(-5%) translateY(5%);
  #musa-1 {
    animation: ${leaf2} infinite 8s ease-in-out;
    transform-origin: bottom left;
  }
  #musa-2 {
    animation: ${leaf2} infinite 6s ease-in-out;
    transform-origin: bottom left;
  }
  #musa-3 {
    animation: ${leaf2} infinite 10s ease-in-out;
    transform-origin: bottom left;
  }
`;

const StyledPhilodendronSmall = styled(PhilodendronSmall)`
  transform: translatex(5%) translateY(7%);
  #philodendron-small-1 {
    animation: ${leaf} infinite 6s ease-in-out;
    transform-origin: bottom right;
  }
  #philodendron-small-2 {
    animation: ${leaf2} infinite 8s ease-in-out;
    transform-origin: bottom center;
  }
`;

const StyledPenstemon = styled(Penstemon)`
  transform: translateY(2%);
  #penstemon-1 {
    animation: ${leaf} infinite 6s ease-in-out;
    transform-origin: bottom center;
  }
  #penstemon-2 {
    animation: ${leaf2} infinite 8s ease-in-out;
    transform-origin: bottom center;
  }
`;

const StyledRafflesia = styled(Rafflesia)`
  transform: translateX(-3%) translateY(7%);
  #rafflesia {
    animation: ${leaf} infinite 10s ease-in-out;
    transform-origin: bottom left;
  }
`;

const StyledRedFlowers = styled(RedFlowers)`
  transform: scale(0.9) translateY(-6%);
  #redflowers-1 {
    transform: translateX(5%);
  }
  #redflowers-2 {
    transform: translateX(-2%);
  }
`;

const StyledVine = styled(Vine)`
  transform: scale(1.3) translateX(0) translateY(-10%);
`;

const StyledToucan = styled(Toucan)`
  transform: translateX(-3%);
  #toucan-tail {
    animation: ${head} infinite 6s 1s ease-in-out;
    transform-origin: top center;
  }
  #toucan-body {
    animation: ${body} infinite 6s 1s ease-in-out;
    transform-origin: center left;
  }
`;

const StyledSlowth = styled(Slowth)`
  transform: translateY(-1%);
  #slowth-body {
    animation: ${body} infinite 10s ease-in-out;
    transform-origin: top center;
  }
`;

const StyledSnake = styled(Snake)`
  transform: translateX(-1%);
  #snake-head {
    animation: ${head} infinite 10s ease-in-out;
    transform-origin: center left;
  }
`;

const StyledTamarin = styled(Tamarin)`
  #tamarin-head {
    animation: ${head} infinite 10s ease-in-out;
    transform-origin: center left;
  }
  #tamarin-arm {
    animation: ${arm} infinite 10s ease-in-out;
    transform-origin: top center;
  }
  #tamarin-tail {
    animation: ${head} infinite 5s ease-in-out;
    transform-origin: top center;
  }
`;

const StyledBabyBear = styled(BabyBear)`
  #baby-bear-head {
    animation: ${head} infinite 5s 0.5s ease-in-out;
    transform-origin: top center;
  }
  #baby-bear-arm {
    animation: ${head} infinite 5s ease-in-out;
    transform-origin: top center;
  }
`;

const StyledButterfly = styled(Butterfly)`
  #butterfly {
    animation: ${fly} infinite 10s ease-in-out;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 133vw;
  margin: 0 auto;
  background-color: ${color.primaryDark};
  overflow-x: hidden;
  overflow-y: hidden;

  @media ${device.laptop} {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: calc(100vh - 60px);
    min-height: 100%;
    aspect-ratio: 3/4;
  }
`;

const IllustContainer = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 3/4;

  @media ${device.laptop} {
    max-height: 872px;
  }

  svg {
    position: absolute;
  }
`;

const DownloadBtn = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 32px;
  height: 32px;
  background-color: ${color.primary};
  border-radius: 16px;
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

const Illust = ({ badgeInfo, isMine }) => {
  const imageRef = useRef();

  const exportElementAsPNG = (el) => {
    toPng(el).then((image) => {
      const link = window.document.createElement('a');
      link.style = 'display:none;';
      link.download = 'wegreen-my-forest.png';
      link.href = image;
      link.click();
    });
  };

  return (
    <Container>
      <IllustContainer ref={imageRef}>
        <Background width='100%' height='100%' />
        {badgeInfo[0] ? (
          <>
            {badgeInfo[0].type === 'selected' ? (
              <StyledPalm width='100%' height='100%' />
            ) : null}
            {badgeInfo[10].type === 'selected' ? (
              <StyledPuma width='100%' height='100%' />
            ) : null}
            {badgeInfo[1].type === 'selected' ? (
              <StyledMonstera width='100%' height='100%' />
            ) : null}
            {badgeInfo[11].type === 'selected' ? (
              <StyledStag width='100%' height='100%' />
            ) : null}
            {badgeInfo[2].type === 'selected' ? (
              <StyledPhilodendron width='100%' height='100%' />
            ) : null}
            {badgeInfo[3].type === 'selected' ? (
              <StyledGuzmania width='100%' height='100%' />
            ) : null}
            {badgeInfo[12].type === 'selected' ? (
              <StyledRedPanda width='100%' height='100%' />
            ) : null}
            {badgeInfo[13].type === 'selected' ? (
              <StyledFox width='100%' height='100%' />
            ) : null}
            {badgeInfo[4].type === 'selected' ? (
              <StyledMusa width='100%' height='100%' />
            ) : null}
            {badgeInfo[6].type === 'selected' ? (
              <StyledPhilodendronSmall width='100%' height='100%' />
            ) : null}
            {badgeInfo[5].type === 'selected' ? (
              <StyledPenstemon width='100%' height='100%' />
            ) : null}
            {badgeInfo[7].type === 'selected' ? (
              <StyledRafflesia width='100%' height='100%' />
            ) : null}
            {badgeInfo[8].type === 'selected' ? (
              <StyledRedFlowers width='100%' height='100%' />
            ) : null}
            {badgeInfo[9].type === 'selected' ? (
              <StyledVine width='100%' height='100%' />
            ) : null}
            {badgeInfo[14].type === 'selected' ? (
              <StyledToucan width='100%' height='100%' />
            ) : null}
            {badgeInfo[15].type === 'selected' ? (
              <StyledSlowth width='100%' height='100%' />
            ) : null}
            {badgeInfo[16].type === 'selected' ? (
              <StyledSnake width='100%' height='100%' />
            ) : null}
            {badgeInfo[17].type === 'selected' ? (
              <StyledTamarin width='100%' height='100%' />
            ) : null}
            {badgeInfo[18].type === 'selected' ? (
              <StyledBabyBear width='100%' height='100%' />
            ) : null}
            {badgeInfo[19].type === 'selected' ? (
              <StyledButterfly width='100%' height='100%' />
            ) : null}
          </>
        ) : null}
      </IllustContainer>
      {isMine ? (
        <DownloadBtn onClick={() => exportElementAsPNG(imageRef.current)}>
          <DownloadIcon width='20' height='20' fill={color.white} />
        </DownloadBtn>
      ) : null}
    </Container>
  );
};

export default Illust;
