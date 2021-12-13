import Router from 'express-promise-router';
import { QueryClient } from 'react-query';
import { render } from '../../ssr/render';
import { brotli } from '../../utils/brotli';


const router = Router();

router.get( '/terms', async ( req, res ) => {
  const queryClient = new QueryClient();
  const html        = await render( req.url, queryClient );
  const br          = await brotli( html );

  return res
    .set( 'Content-Encoding', 'br' )
    .set( 'Content-Type', 'text/html; charset=UTF-8' )
    .set( 'Cache-control', 'max-age=0, no-store' )
    .vary( 'Accept-Encoding' )
    .status( 200 )
    .send( br );
} );


export { router as termsRouter };