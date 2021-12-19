import Router from 'express-promise-router';
import { Post } from '../../models';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';
import { PAGES } from '../../constants/pages';
import { POSTS_LIMIT } from '../../../../constants/config';
import { collectPreAssets } from '../../ssr/collectPreAssets';


const router = Router();

router.get( PAGES.root, async ( req, res ) => {
  const { fallback } = res.locals;

  const posts = await getPosts(); // todo
  fallback[ '/api/v1/posts' ] = [ posts ];

  const html   = await render( req.url, fallback, collectPreAssets( posts, 3 ) );
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

// todo
async function getPosts() {
  return await Post.findAll( { limit : POSTS_LIMIT, offset: 0 } );
}

export { router as rootRouter };