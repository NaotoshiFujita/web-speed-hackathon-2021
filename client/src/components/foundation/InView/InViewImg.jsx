import React, { useEffect, useRef } from 'react';


export const InViewImg = ( { src, alt = '', lazy, ssr = true, ...props } ) => {
  const imageRef = useRef();

  if ( lazy ) {
    useEffect( () => {
      const { current: el } = imageRef;

      if ( el && el.src !== src ) {
        const observer = new IntersectionObserver( ( [ entry ] ) => {
          if ( entry && entry.isIntersecting ) {
            el.src = src;
            observer.disconnect();
          }
        } );

        observer.observe( el );
        return () => observer.disconnect();
      }
    }, [] );
  }

  return (
    <img
      ref={ imageRef }
      src={ lazy
        ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8ePX2fwAIggOCR8M6ygAAAABJRU5ErkJggg=='
        : src
      }
      alt={ alt }
      { ...props }
    />
  );
}