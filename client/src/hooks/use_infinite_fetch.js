import React from 'react';
import { useInfiniteQuery } from 'react-query';

const LIMIT = 7;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @param {T[]} initialData
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch( apiPath, fetcher, initialData = [] ) {
  const { data = {}, isLoading, error, fetchNextPage } = useInfiniteQuery(
    apiPath,
    ( { pageParam = 0 } ) => fetcher( `${ apiPath }?limit=${ LIMIT }&offset=${ pageParam * LIMIT }` ),
    {
      initialData,
      getNextPageParam: ( lastPage, allPages ) => allPages.length,
    }
  );

  return {
    data: [].concat( ...( data.pages || [] ) ),
    error,
    isLoading,
    fetchMore: fetchNextPage,
  };
}