import React from 'react';
import InView from 'react-intersection-observer';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ( { children, fetchMore, items } ) => {
  const latestItem    = items[ items.length - 1 ];
  const latestItemRef = React.useRef();

  const onChange = inView => {
    if ( inView && items.length && latestItem !== latestItemRef.current ) {
      fetchMore();
      latestItemRef.current = latestItem;
    }
  };

  return (
    <>
      { children }
      <InView rootMargin="200px" as="div" onChange={ onChange } className="w-full h-px"/>
    </>
  );
};

export { InfiniteScroll };
