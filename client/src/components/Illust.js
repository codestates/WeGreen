import styled, { keyframes } from 'styled-components';
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

const skew = keyframes`
0% {
  transform: scaleY(0.9);
}
50% {
  transform: scaleY(1);
}
100% {
  transform: scaleY(0.9);
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
  transform: translateX(-5%) translateY(8%);
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
  transform: translateX(-3%) translateY(6%);
  #rafflesia {
    animation: ${leaf2} infinite 10s ease-in-out;
    transform-origin: bottom left;
  }
`;

const StyledRedFlowers = styled(RedFlowers)``;

const StyledVine = styled(Vine)`
  transform: translateX(0) translateY(-7.5%);
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
  #slowth-body {
    animation: ${body} infinite 10s ease-in-out;
    transform-origin: top center;
  }
`;

const StyledSnake = styled(Snake)`
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

const IllustContainer = styled.div`
  position: relative;
  width: 100vw; /* 임시 */
  height: 133vw;
  min-height: 133%; /* 임시 */
  margin: 0 auto;
  /* padding: 1rem; */
  background-color: ${color.primaryDark};
  overflow: hidden;

  @media ${device.laptop} {
    width: 100%;
    height: calc(100vh - 60px);
  }

  svg {
    position: absolute;
  }
`;

const Illust = () => {
  return (
    <IllustContainer>
      <Background width='100%' height='100%' />
      <StyledPalm width='100%' height='100%' />
      <StyledPuma width='100%' height='100%' />
      <StyledMonstera width='100%' height='100%' />
      <StyledStag width='100%' height='100%' />
      <StyledPhilodendron width='100%' height='100%' />
      <StyledGuzmania width='100%' height='100%' />
      <StyledRedPanda width='100%' height='100%' />
      <StyledFox width='100%' height='100%' />
      <StyledMusa width='100%' height='100%' />
      <StyledPhilodendronSmall width='100%' height='100%' />
      <StyledPenstemon width='100%' height='100%' />
      <StyledRafflesia width='100%' height='100%' />
      <StyledRedFlowers width='100%' height='100%' />
      <StyledVine width='100%' height='100%' />
      <StyledToucan width='100%' height='100%' />
      <StyledSlowth width='100%' height='100%' />
      <StyledSnake width='100%' height='100%' />
      <StyledTamarin width='100%' height='100%' />
      <StyledBabyBear width='100%' height='100%' />
      <StyledButterfly width='100%' height='100%' />
    </IllustContainer>
  );
};

export default Illust;
