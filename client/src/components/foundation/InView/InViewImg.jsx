import React, { useCallback } from 'react';
import InView from 'react-intersection-observer';


export const InViewImg = ( { src, lazy, ...props } ) => {
  const onChange = useCallback( ( inView, entry ) => {
    if ( inView ) {
      entry.target.src = src;
    }
  }, [ src ] );

  return (
    <InView
      rootMargin="200px"
      as="img"
      src={ lazy
        ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        : src
      }
      triggerOnce
      onChange={ onChange }
      { ...props }
    />
  );
}