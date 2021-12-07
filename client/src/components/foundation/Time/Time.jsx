import React from 'react';

// The time looks UTC format.
const Time = ( { time } ) => {
  const date      = new Date( Date.parse( time ) );
  const ISOString = date.toISOString();
  // const localDate = new Date( Date.parse( `${ ISOString.replace( 'Z', '' ) }+09:00` ) );

  return (
    <time dateTime={ ISOString }>
      { `${ date.getFullYear() }年${ date.getMonth() + 1 }月${ date.getDate() }日` }
    </time>
  );
};

export { Time };