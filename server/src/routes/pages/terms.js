import Router from 'express-promise-router';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';
import { PAGES } from '../../constants/pages';


const router = Router();

router.get( PAGES.terms, async ( req, res ) => {
  const html   = await render( req.url, res.locals.queryClient );
  const canUse = canUseBrotli( req );

  if ( canUse ) {
    res.set( 'Content-Encoding', 'br' )
  }

  return res
    .set( 'Content-Type', 'text/html; charset=UTF-8' )
    .set( 'Cache-control', 'max-age=0, no-store' )
    .status( 200 )
    .send( canUse ? await brotli( html ) : html );
} );


export { router as termsRouter };