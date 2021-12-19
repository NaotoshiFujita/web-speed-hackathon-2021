import React from 'react';
import useSWRInfinite, { unstable_serialize } from 'swr/infinite'
import { useSWRConfig } from 'swr';


export function useInfiniteFetch( apiPath, fetcher, limit ) {
  const getKey = ( pageIndex, previousPageData ) => {
    if ( previousPageData && ! previousPageData.length ) {
      return null;
    }

    return `${ apiPath }?limit=${ limit }&offset=${ pageIndex * limit }`
  }

  const { fallback } = useSWRConfig();
  const { data = [], isValidating, error, size, setSize } = useSWRInfinite( getKey, fetcher, {
    fallback: {
      [ unstable_serialize( getKey ) ]: fallback[ apiPath ],
    }
  } );

  return {
    data: [].concat( ...data ),
    error,
    isLoading: isValidating,
    fetchMore: () => setSize( size + 1 ),
  };
}