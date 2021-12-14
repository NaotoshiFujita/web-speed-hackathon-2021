import Router from 'express-promise-router';
import { Post } from '../../models';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';
import { IMAGE_FORMAT } from '../../constants/image';
import { PAGES } from '../../constants/pages';


const router = Router();

router.get( PAGES.root, async ( req, res ) => {
  const { queryClient } = res.locals;

  const posts = await getPosts(); // todo
  await queryClient.prefetchInfiniteQuery( '/api/v1/posts', () => Promise.resolve( posts ) );

  const html   = await render(
    req.url,
    queryClient,
    collectImages( posts ).map( path => `<link rel="preload" href="${ path }" as="image">` ).join( '' )
  );
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
  return await Post.findAll( { limit : 7, offset: 0 } );
}

// todo
function collectImages( posts ) {
  const images = [];

  if ( posts ) {
    posts.forEach( post => {
      images.push( ...post.images.map( image => {
        return `/images/${ image.id }${ images.length > 3 ? '.small' : '' }.${ IMAGE_FORMAT }`;
      } ) );
      // images.push( `/images/profiles/${ post.user.profileImage.id}.${ IMAGE_FORMAT }` );
    } );
  }

  return images;
}


export { router as rootRouter };