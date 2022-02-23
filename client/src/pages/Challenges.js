import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../actions';
import styled from 'styled-components';
import { color, device, contentWidth, boxShadow } from '../styles';
import SearchBar from '../components/SearchBar';
// import ChallengeCard from '../components/ChallengeCard';
import InfiniteScroll from '../components/InfiniteScroll';
import Loading from '../components/Loading';
import NoResult from '../components/NoResult';
import { ReactComponent as AddIcon } from '../assets/images/icon_add.svg';
import { requestPopularChallenges, requestLatestChallenges } from '../apis';

const ChallengesContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-bottom: 2rem;
  background-color: ${color.primaryLight};
`;

const ChallengeListContainer = styled.div`
  padding: 1rem;
  max-width: ${contentWidth};
  margin: 0 auto;

  @media ${device.laptop} {
    padding: 1rem 0;
  }
`;

const ChallengeList = styled.ul`
  & > div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 0;

    @media ${device.mobileLandscape} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.laptop} {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 999;
  width: 60px;
  height: 60px;
  background-color: ${color.secondary};
  box-shadow: ${boxShadow};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  /* span {
    display: none;
  } */

  @media ${device.laptop} {
    right: calc((100vw - ${contentWidth}) / 2 + 1.5rem);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover {
    &::after {
      opacity: 0.1;
    }
  }
`;

const Sorting = styled.div`
  margin: 1.5rem 0;
  color: ${color.primaryBorder};
  text-align: right;
  font-weight: bold;
  font-size: 1rem;
`;

const TextBtn = styled.button`
  background-color: transparent;
  font-size: inherit;
  font-weight: bold;
  color: ${(props) => (props.selected ? color.primary : 'inherit')};
  cursor: pointer;
`;

const Challenges = () => {
  const dispatch = useDispatch();
  dispatch(changeTitle('WeGreen | 챌린지 목록'));

  const navigate = useNavigate();
  const [sorting, setSorting] = useState('latest');
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoResult, setHasNoResult] = useState(false);
  const [hasNoMoreResult, setHasNoMoreResult] = useState(false);

  const fetchNextData = async () => {
    if (!hasNoMoreResult) {
      const scrollY = window.scrollY;
      setIsLoading(true);
      if (sorting === 'latest') {
        const result = await requestLatestChallenges(10, page + 1, query);
        setChallenges([...challenges, ...result]);
        setPage(page + 1);
        if (result.length === 0) setHasNoMoreResult(true);
      } else {
        const result = await requestPopularChallenges(10, page + 1, query);
        setChallenges([...challenges, ...result]);
        setPage(page + 1);
        if (result.length === 0) setHasNoMoreResult(true);
      }
      setIsLoading(false);
      window.scrollTo(0, scrollY);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (sorting === 'latest') {
      requestLatestChallenges(10, 1, query).then((result) => {
        setChallenges(result);
        if (result.length === 0) setHasNoResult(true);
      });
    } else {
      requestPopularChallenges(10, 1, query).then((result) => {
        setChallenges(result);
        if (result.length === 0) setHasNoResult(true);
      });
    }
    setPage(1);
    setIsLoading(false);
  };

  console.log('challenges:', challenges);

  useEffect(() => {
    setIsLoading(true);
    if (sorting === 'latest') {
      requestLatestChallenges(10).then((result) => {
        setChallenges(result);
        if (result.length === 0) setHasNoResult(true);
      });
    } else {
      setIsLoading(true);
      requestPopularChallenges(10).then((result) => {
        setChallenges(result);
        if (result.length === 0) setHasNoResult(true);
      });
    }
    setIsLoading(false);
  }, [sorting]);

  return (
    <ChallengesContainer>
      <ChallengeListContainer>
        <SearchBar handleValue={setQuery} handleSubmit={handleSubmit} />
        <AddButton onClick={() => navigate('/createchallenge')}>
          <AddIcon width='20' height='20' fill={color.white} />
        </AddButton>
        <Sorting>
          <TextBtn
            selected={sorting === 'latest'}
            onClick={() => setSorting('latest')}
          >
            최신순
          </TextBtn>
          /
          <TextBtn
            selected={sorting === 'popular'}
            onClick={() => setSorting('popular')}
          >
            인기순
          </TextBtn>
        </Sorting>
        {hasNoResult && !isLoading ? (
          <NoResult theme='light' text='해당 챌린지가 없습니다.' />
        ) : null}
        {isLoading ? (
          <Loading
            theme='light'
            text={`챌린지 목록을 ${page > 1 ? '더 ' : ''}불러오는 중입니다.`}
          />
        ) : (
          <ChallengeList>
            <InfiniteScroll
              data={challenges}
              type='challenge'
              isLoading={isLoading}
              fetchNextData={fetchNextData}
            />
          </ChallengeList>
        )}

        {hasNoMoreResult && !isLoading ? (
          <NoResult theme='light' text='더 이상 해당하는 챌린지가 없습니다.' />
        ) : null}
      </ChallengeListContainer>
    </ChallengesContainer>
  );
};

export default Challenges;
