import React, { useEffect } from 'react';


export function Font( { delay = 100 } ) {
  useEffect( () => {
    // const timer = setTimeout( () => {
      document.head.insertAdjacentHTML( 'beforeend', '<link rel="stylesheet" href="/styles/webfont.css">' );
    // }, delay );

    // return () => { clearTimeout( timer ) };
  }, [] );

  return null;
}
