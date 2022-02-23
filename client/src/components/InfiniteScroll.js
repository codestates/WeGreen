import React, { useEffect } from 'react';
import ChallengeCard from './ChallengeCard';

const InfiniteScroll = ({ data, type, isLoading, fetchNextData }) => {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      console.log('Fetch Next Data!');
      fetchNextData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  // eslint-disable-next-line
  }, []);

  return (
    <div>
      {type === 'challenge'
        ? data.map((el, index) => (
            <ChallengeCard
              challenge={el}
              key={index}
            />
          ))
        : null}
    </div>
  );
};

export default InfiniteScroll;
