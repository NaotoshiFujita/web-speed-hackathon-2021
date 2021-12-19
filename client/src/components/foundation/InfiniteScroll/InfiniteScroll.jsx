import React, { useEffect, useRef } from 'react';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ( { children, fetchMore, items } ) => {
  const latestItem    = items[ items.length - 1 ];
  const latestItemRef = useRef();
  const divRef        = useRef();

  useEffect( () => {
    const { current: el } = divRef;

    if ( el ) {
      const observer = new IntersectionObserver( ( [ entry ] ) => {
        if ( entry && entry.isIntersecting && items.length && latestItem !== latestItemRef.current ) {
          fetchMore();
          latestItemRef.current = latestItem;
        }
      } );

      observer.observe( el );
      return () => observer.disconnect();
    }
  }, [ fetchMore ] );

  return (
    <>
      { children }
      <div ref={ divRef } className="w-full h-px" />
    </>
  );
};

export { InfiniteScroll };
