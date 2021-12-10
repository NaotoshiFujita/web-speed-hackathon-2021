import Router from 'express-promise-router';

const router = Router();

router.get( '*.js', ( req, res, next ) => {
  if ( req.header( 'Accept-Encoding' ).includes( 'br' ) ) {
    req.url = req.url + '.br';
    res.set( 'Content-Encoding', 'br' );
    res.set( 'Content-Type', 'application/javascript; charset=UTF-8' );
  }
  next();
} );

router.get( '*.css', ( req, res, next ) => {
  if ( req.header( 'Accept-Encoding' ).includes( 'br' ) ) {
    req.url = req.url + '.br';
    res.set( 'Content-Encoding', 'br' );
    res.set( 'Content-Type', 'text/css; charset=UTF-8' );
  }
  next();
} );

export { router as compressionRouter };
