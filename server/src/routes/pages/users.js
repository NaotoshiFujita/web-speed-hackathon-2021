import Router from 'express-promise-router';
import { QueryClient } from 'react-query';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';
import { Post, User } from '../../models';


const router = Router();

router.get( '/users/:username', async ( req, res ) => {
  const { username } = req.params;
  const user        = await User.findOne( { where: { username } } );
  const queryClient = new QueryClient();

  if ( user ) {
    await queryClient.prefetchQuery( `/api/v1/users/${ username }`, () => Promise.resolve( user ) );
    await queryClient.prefetchInfiniteQuery( `/api/v1/users/${ username }/posts`, () => getPosts( user.id ) );
  }

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

async function getPosts( userId ) {
  return await Post.findAll( {
    limit : 7, // todo
    offset: 0,
    where : { userId },
  } );
}

export { router as usersRouter };