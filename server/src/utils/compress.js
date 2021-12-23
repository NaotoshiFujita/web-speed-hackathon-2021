import zlib from 'zlib';
import { promisify } from 'util';


export async function compress( string, mode ) {
  if ( mode ) {
    if ( mode === 'br' ) {
      return await brotli( string );
    } else if ( mode === 'gz' || mode === 'gzip' ) {
      return await gzip( string );
    }
  }

  return string;
}

export async function gzip( string ) {
  const gzip = promisify( zlib.gzip );
  return await gzip( string );
}

export async function brotli( string ) {
  const brotli = promisify( zlib.brotliCompress );

  return await brotli( string, {
    params: {
      [ zlib.constants.BROTLI_PARAM_MODE ]: zlib.constants.BROTLI_MODE_TEXT,
    },
  } );
}

export function canUseBrotli( req ) {
  return req.header( 'Accept-Encoding' ).includes( 'br' );
}