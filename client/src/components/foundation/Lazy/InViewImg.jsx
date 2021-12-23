import React from 'react';
import { PLACEHOLDER } from './constants';
import { InView } from 'react-intersection-observer';


export const InViewImg = ( { src, alt = '', lazy, ...props } ) => {
  if ( lazy ) {
    return (
      <InView triggerOnce>
        { ( { inView, ref } ) => (
          <img ref={ ref } src={ inView ? src : PLACEHOLDER } alt={ alt } { ...props } />
        ) }
      </InView>
    );
  }

  return <img src={ src } alt={ alt } { ...props } />
}