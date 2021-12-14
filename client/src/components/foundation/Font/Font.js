import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export function Font( { delay = 0 } ) {
  const [ shouldLoad, setShouldLoad ] = useState( false );

  let timer = setTimeout( () => {
    setShouldLoad( true );
  }, delay );

  useEffect( () => {
    return () => { clearTimeout( timer ) };
  } );

  if ( ! shouldLoad ) {
    return null;
  }

  return (
    <Helmet>
      <link rel="stylesheet" href="/styles/webfont.css" />
    </Helmet>
  );
}
