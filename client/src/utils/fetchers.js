import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const response    = await fetch( url );
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON( url ) {
  const response = await fetch( url );
  const result   = await response.json();

  // todo: limit the number (900)
  return result;
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const response = await fetch( url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  } );

  // todo convert?
  return response.json();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  // todo
  const jsonString = JSON.stringify( data );
  const uint8Array = new TextEncoder().encode( jsonString );
  const compressed = gzip( uint8Array );

  const response = await fetch( url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type'    : 'application/json',
    },
    body: compressed,
  } );

  return response.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
