import Router from 'express-promise-router';
import { canUseBrotli } from '../utils/compress';
import { ASSET_ENCODING } from '../../../constants/config';

const router = Router();

router.get( '*.js', ( req, res, next ) => {
  bypass( req, res );
  res.set( 'Content-Type', 'application/javascript; charset=UTF-8' );
  next();
} );

router.get( '*.css', ( req, res, next ) => {
  bypass( req, res );
  res.set( 'Content-Type', 'text/css; charset=UTF-8' );
  next();
} );

function bypass( req, res ) {
  if ( ASSET_ENCODING === 'br' ) {
    if ( canUseBrotli( req ) ) {
      req.url = req.url + '.br';
      res.set( 'Content-Encoding', 'br' );
    }
  } else if ( ASSET_ENCODING === 'gzip' ) {
    req.url = req.url + '.gz';
    res.set( 'Content-Encoding', 'gzip' );
  }
}

export { router as compressionRouter };
