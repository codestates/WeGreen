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

  const fetchNextData = () => {
    if (!hasNoMoreResult) {
      setIsLoading(true);
      setPage((page) => page + 1);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (sorting === 'latest') {
      requestLatestChallenges(20, 1, query).then((result) => {
        setChallenges(result);
        if (result.length === 0) setHasNoResult(state => true);
        else if (result.length < 20) setHasNoMoreResult(state => true);
      });
    } else {
      requestPopularChallenges(20, 1, query).then((result) => {
        setChallenges(result);
        if (result.length === 0) setHasNoResult(state => true);
        else if (result.length < 20) setHasNoMoreResult(state => true);
      });
    }
    setPage((page) => 1);
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchNextPage() {
      const scrollY = window.scrollY;
      if (page > 1) {
        if (sorting === 'latest') {
          const result = await requestLatestChallenges(20, page, query);
          setChallenges((challenges) => [...challenges, ...result]);
          if (result.length < 20) setHasNoMoreResult(state => true);
        } else {
          const result = await requestPopularChallenges(20, page, query);
          setChallenges((challenges) => [...challenges, ...result]);
          if (result.length < 20) setHasNoMoreResult(state => true);
        }
        setIsLoading(false);
        window.scrollTo(0, scrollY);
      }
    }
    fetchNextPage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    if (sorting === 'latest') {
      requestLatestChallenges(20).then((result) => {
        setChallenges(result);
        if (result.length === 0) setHasNoResult(state => true);
      });
    } else {
      setIsLoading(true);
      requestPopularChallenges(20).then((result) => {
        setChallenges(result);
        if (result.length === 0) setHasNoResult(state => true);
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
        <ChallengeList>
          <InfiniteScroll
            data={challenges}
            type='challenge'
            isLoading={isLoading}
            fetchNextData={fetchNextData}
          />
        </ChallengeList>
        {isLoading ? (
          <Loading
            theme='light'
            text={`챌린지 목록을 ${page > 1 ? '더 ' : ''}불러오는 중입니다.`}
          />
        ) : null}
        {hasNoMoreResult && !isLoading ? (
          <NoResult theme='light' text='더 이상 해당하는 챌린지가 없습니다.' />
        ) : null}
      </ChallengeListContainer>
    </ChallengesContainer>
  );
};

export default Challenges;
