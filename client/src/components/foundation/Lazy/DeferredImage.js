import React from 'react';
import { PLACEHOLDER } from './constants';


export const DeferredImage = ( { src, alt = '', defer = true, ...props } ) => {
  return (
    <img
      src={ defer ? PLACEHOLDER : src }
      data-src={ defer ? src : null }
      alt={ alt }
      { ...props }
    />
  );
}