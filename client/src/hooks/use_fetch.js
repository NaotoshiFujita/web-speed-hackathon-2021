import React from 'react';
import useSWR from 'swr';


export function useFetch( apiPath, fetcher ) {
  return useSWR( apiPath, fetcher );
}
