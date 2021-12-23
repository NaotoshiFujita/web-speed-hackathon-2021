import Router from 'express-promise-router';
import { Post } from '../../models';
import { render } from '../../ssr/render';
import { compress } from '../../utils/compress';
import { PAGES } from '../../constants/pages';
import { POSTS_LIMIT, TIMELINE_LAZYLOAD_MIN_INDEX } from '../../../../constants/config';
import { collectPreAssets } from '../../ssr/collectPreAssets';
import { create, getPath } from '../../cache/cache';


const router = Router();

router.get( PAGES.root, async ( req, res ) => {
  const { fallback, type, signedIn } = res.locals;

  if ( ! signedIn ) {
    const path = await getPath( req.url, type );

    if ( path ) {
      return res.status( 200 ).sendFile( path );
    }
  }

  const posts = await Post.findAll( { limit : POSTS_LIMIT, offset: 0 } );
  fallback[ '/api/v1/posts' ] = [ posts ];

  const html = await render( req.url, fallback, collectPreAssets( posts, TIMELINE_LAZYLOAD_MIN_INDEX ) );

  if ( ! signedIn ) {
    await create( req.url, html );
  }

  return res.status( 200 ).send( await compress( html, type ) );
} );

export { router as rootRouter };