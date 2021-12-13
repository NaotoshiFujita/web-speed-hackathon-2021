import Router from 'express-promise-router';
import { QueryClient } from 'react-query';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';


const router = Router();

router.get( '/terms', async ( req, res ) => {
  const queryClient = new QueryClient();
  const html        = await render( req.url, queryClient );
  const canUse      = canUseBrotli( req );

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