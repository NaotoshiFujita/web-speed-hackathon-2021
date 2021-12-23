import Router from 'express-promise-router';
import { render } from '../../ssr/render';
import { compress } from '../../utils/compress';
import { PAGES } from '../../constants/pages';
import { create, getPath } from '../../cache/cache';


const router = Router();

router.get( PAGES.terms, async ( req, res ) => {
  const { fallback, type, signedIn } = res.locals;

  if ( ! signedIn ) {
    const path = await getPath( req.url, type );

    if ( path ) {
      return res.status( 200 ).sendFile( path );
    }
  }

  const html = await render( req.url, fallback );

  if ( ! signedIn ) {
    await create( req.url, html );
  }

  return res.status( 200 ).send( await compress( html, type ) );
} );


export { router as termsRouter };