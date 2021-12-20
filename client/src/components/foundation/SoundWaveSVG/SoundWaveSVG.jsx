import React from 'react';


export const SoundWaveSVG = ( { wave } ) => {
  try {
    const { max, peaks } = JSON.parse( wave );

    if ( max && peaks ) {
      return (
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 1"
          style={ { fill: '#2563EB' } }
        >
          { peaks.map( ( peak, index ) => {
            const ratio = peak / max;
            return <rect key={ `${ peak }-${ index }` } width="1" height={ ratio } x={ index } y={ 1 - ratio } />;
          } ) }
        </svg>
      );
    }
  } catch ( e ) {
    console.error( e );
  }

  return null;
}