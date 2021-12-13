import Router from 'express-promise-router';
import { QueryClient } from 'react-query';
import { render } from '../../ssr/render';
import { brotli } from '../../utils/brotli';
import { Comment, Post } from '../../models';


const router = Router();

router.get( '/posts/:postId', async ( req, res ) => {
  const { postId } = req.params;
  const post        = await Post.findByPk( postId );
  const queryClient = new QueryClient();

  if ( post ) {
    await queryClient.prefetchQuery( `/api/v1/posts/${ postId }`, () => Promise.resolve( post ) );
    await queryClient.prefetchInfiniteQuery( `/api/v1/posts/${ postId }/comments`, () => getComments( postId ) );
  }

  const html = await render( req.url, queryClient );
  const br   = await brotli( html );

  return res
    .set( 'Content-Encoding', 'br' )
    .set( 'Content-Type', 'text/html; charset=UTF-8' )
    .set( 'Cache-control', 'max-age=0, no-store' )
    .vary( 'Accept-Encoding' )
    .status( post ? 200 : 404 )
    .send( br );
} );

async function getComments( postId ) {
  return await Comment.findAll( {
    limit : 7, // todo
    offset: 0,
    where : { postId },
  } );
}

export { router as postsRouter };