import React, { useEffect } from 'react';
import ChallengeCard from './ChallengeCard';

const InfiniteScroll = ({ data, type, isLoading, fetchNextData }) => {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      fetchNextData();
    }
  };

  const throttle = (func, waits) => {
    let lastFunc; // timer id of last invocation
    let lastRan; // time stamp of last invocation
    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= waits) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, waits - (Date.now() - lastRan));
      }
    };
  };

  useEffect(() => {
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight;
    if (clientWidth > 1024 && (60 + 16 + 40 + 70) + 954 < clientHeight) {
      fetchNextData();
    }
    window.addEventListener('scroll', throttle(handleScroll, 500))
    return () => {
      window.removeEventListener('scroll', throttle(handleScroll, 500))
    };
  // eslint-disable-next-line
  }, []);


  return (
    <div>
      {data && type === 'challenge'
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
