import Router from 'express-promise-router';
import { Post, User } from '../../models';
import { QueryClient } from 'react-query';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';


const router = Router();

router.get( '/', async ( req, res ) => {
  const queryClient = new QueryClient();
  const posts       = await getPosts(); // todo

  await queryClient.prefetchQuery( '/api/v1/me', () => findUser( req ) );
  await queryClient.prefetchInfiniteQuery( '/api/v1/posts', () => Promise.resolve( posts ) );

  const html   = await render( req.url, queryClient );
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


async function findUser( req ) {
  const { userId } = req.session;
  return userId && await User.findByPk( userId );
}

// todo
async function getPosts() {
  return await Post.findAll( { limit : 7, offset: 0 } );
}

// todo
function collectImages( posts ) {
  const images = [];

  if ( posts ) {
    posts.forEach( post => {
      images.push( ...post.images.map( image => `/images/${ image.id }.avif` ) );
      images.push( `/images/profiles/${ post.user.profileImage.id}.avif` );
    } );
  }

  return images;
}


export { router as rootRouter };