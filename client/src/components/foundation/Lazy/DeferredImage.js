import React, { useCallback } from 'react';
import { PLACEHOLDER } from './constants';


export const DeferredImage = ( { src, alt = '', defer = true, ...props } ) => {
  const imgRefCallback = useCallback( el => {
    if ( el && el.src !== src ) {
      el.src = src;
    }
  }, [] );

  return (
    <img
      ref={ imgRefCallback }
      src={ defer ? PLACEHOLDER : src }
      data-src={ defer ? src : null }
      alt={ alt }
      { ...props }
    />
  );
}