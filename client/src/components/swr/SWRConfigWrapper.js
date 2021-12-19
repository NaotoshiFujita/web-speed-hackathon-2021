import React, { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';


export const SWRConfigWrapper = ( { config, children } ) => {
  const [ value, setValue ] = useState( config );

  useEffect( () => {
    setValue( {
      ...config,
      revalidateIfStale: true,
    } );
  }, [] )

  return (
    <SWRConfig value={ value }>
      { children }
    </SWRConfig>
  );
}