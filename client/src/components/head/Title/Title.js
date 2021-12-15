import React, { useEffect } from 'react';


export function Title( { title } ) {
  useEffect( () => {
    document.title = title;
  }, [ title ] );

  return null;
}