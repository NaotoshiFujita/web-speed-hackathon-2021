import zlib from 'zlib';
import { promisify } from 'util';


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