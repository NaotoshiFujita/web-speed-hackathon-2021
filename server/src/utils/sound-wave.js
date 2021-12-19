const AudioContext = require( 'web-audio-api' ).AudioContext;


async function decode( data ) {
  const audioCtx = new AudioContext();

  const buffer = await new Promise( ( resolve, reject ) => {
    audioCtx.decodeAudioData( data.slice( 0 ), resolve, reject );
  } );

  const leftData  = buffer.getChannelData( 0 ).map( Math.abs );
  const rightData = buffer.getChannelData( 1 ).map( Math.abs );

  const normalized = leftData.map( ( data, index ) => {
    return ( data + rightData[ index ] || 0 ) / 2;
  } );

  const chunks = chunk( normalized, Math.ceil( normalized.length / 100 ) );

  const peaks = chunks.map( chunk => {
    return chunk.reduce( ( acc, value ) => acc + value, 0 ) / chunk.length;
  } );

  const max = Math.max( ...peaks );

  return { max, peaks };
}

/**
 * Split the array into small chunks.
 *
 * @param {Array|Float32Array} array
 * @param {number} size
 * @returns {Array}
 */
function chunk( array, size ) {
  const result = [];

  if ( size > 0 ) {
    for ( let i = 0; i < array.length; i += size ) {
      result.push( array.slice( i, i + size ) );
    }
  }

  return result;
}

/**
 * Generate SVG string by the provided data.
 *
 * @param {number} max
 * @param {number[]} peaks
 * @returns {string}
 */
function svg( max, peaks ) {
  let svg = '';

  svg = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">`

  svg += peaks.map( ( peak, index ) => {
    const ratio = peak / max;
    return `<rect fill="#2563EB" width="1" height="${ ratio }" x="${ index }" y="${ 1 - ratio }" />`;
  } ).join( '' );

  svg += `</svg>`;

  return svg;
}

async function generateWave( data ) {
  const { max, peaks } = await decode( data );
  return svg( max, peaks );
}

module.exports.decode = decode;
module.exports.generateWave = generateWave;
