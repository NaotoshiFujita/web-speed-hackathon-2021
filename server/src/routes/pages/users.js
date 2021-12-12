import React from 'react';
import Router from 'express-promise-router';
import { QueryClient } from 'react-query';
import { render } from '../../ssr/render';
import { brotli } from '../../utils/brotli';
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

  const html = render( req.url, queryClient );
  const br   = await brotli( html );

  return res
    .set( 'Content-Encoding', 'br' )
    .set( 'Content-Type', 'text/html; charset=UTF-8' )
    .set( 'Cache-control', 'max-age=0, no-store' )
    .vary( 'Accept-Encoding' )
    .status( user ? 200 : 404 )
    .send( br );
} );

async function getPosts( userId ) {
  return await Post.findAll( {
    limit : 7, // todo
    offset: 0,
    where : { userId },
  } );
}

export { router as usersRouter };