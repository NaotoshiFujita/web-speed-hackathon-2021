/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const response = await fetch( url );
  return response.ok ? response.arrayBuffer() : Promise.reject();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON( url ) {
  const response = await fetch( url );
  return response.ok ? response.json() : Promise.reject();
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

  return response.ok ? response.json() : Promise.reject();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const response = await fetch( url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  } );

  return response.ok ? response.json() : Promise.reject();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
