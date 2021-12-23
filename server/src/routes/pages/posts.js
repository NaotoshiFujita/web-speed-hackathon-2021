import Router from 'express-promise-router';
import { render } from '../../ssr/render';
import { compress } from '../../utils/compress';
import { Comment, Post } from '../../models';
import { PAGES } from '../../constants/pages';
import { COMMENTS_LIMIT } from '../../../../constants/config';
import { collectPreAssets } from '../../ssr/collectPreAssets';


const router = Router();

router.get( PAGES.posts, async ( req, res ) => {
  const { postId } = req.params;
  const { fallback, type } = res.locals;
  const post = await Post.findByPk( postId );

  let links;

  if ( post ) {
    const comments = await getComments( postId );
    fallback[ `/api/v1/posts/${ postId }` ] = post;
    fallback[ `/api/v1/posts/${ postId }/comments` ] = [ comments ];
    links = collectPreAssets( [ post ], 1 );
  }

  const html = await render( req.url, fallback, links );
  return res.status( 200 ).send( await compress( html, type ) );
} );

async function getComments( postId ) {
  return await Comment.findAll( {
    limit : COMMENTS_LIMIT,
    offset: 0,
    where : { postId },
  } );
}

export { router as postsRouter };