import React from 'react';

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch( apiPath, fetcher ) {
  const [ result, setResult ] = React.useState( {
    data     : null,
    error    : null,
    isLoading: true,
  } );

  React.useEffect( () => {
    setResult( () => ( {
      data     : null,
      error    : null,
      isLoading: true,
    } ) );

    fetcher( apiPath )
      .then( ( data ) => {
        setResult( cur => ( {
          ...cur,
          data,
          isLoading: false,
        } ) );
      } )
      .catch( ( error ) => {
        setResult( ( cur ) => ( {
          ...cur,
          error,
          isLoading: false,
        } ) );
      } );
  }, [ apiPath, fetcher ] );

  return result;
}
