import React from 'react';
import useSWRInfinite, { unstable_serialize } from 'swr/infinite'
import { useSWRConfig } from 'swr';

const LIMIT = 7;

export function useInfiniteFetch( apiPath, fetcher ) {
  const getKey = ( pageIndex, previousPageData ) => {
    if ( previousPageData && ! previousPageData.length ) {
      return null;
    }

    return `${ apiPath }?limit=${ LIMIT }&offset=${ pageIndex * LIMIT }`
  }

  const { fallback } = useSWRConfig();
  const { data = [], isLoading, error, size, setSize } = useSWRInfinite( getKey, fetcher, {
    fallback: {
      [ unstable_serialize( getKey ) ]: fallback[ apiPath ],
    }
  } );

  return {
    data: [].concat( ...data ),
    error,
    isLoading,
    fetchMore: () => setSize( size + 1 ),
  };
}