import Router from 'express-promise-router';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';
import { Post, User } from '../../models';
import { PAGES } from '../../constants/pages';
import { IMAGE_FORMAT, POSTS_LIMIT } from '../../../../constants/config';
import { collectPreAssets } from '../../ssr/collectPreAssets';
import { pathToPreloadLink } from '../../ssr/pathToPreloadLink';
import { extractUserColor } from '../../utils/extract-user-color';


const router = Router();

router.get( PAGES.users, async ( req, res ) => {
  const { username } = req.params;
  const { fallback } = res.locals;
  const user = await User.findOne( { where: { username } } );

  let links = '';

  if ( user ) {
    // todo hack
    // user.color = await extractUserColor( user.profileImage.id );

    fallback[ `/api/v1/users/${ username }` ] = user;

    const posts = await getPosts( user.id );
    fallback[ `/api/v1/users/${ username }/posts` ] = [ posts ];

    links = pathToPreloadLink( `/images/profiles/${ user.profileImage.id }.${ IMAGE_FORMAT }` );
    links += collectPreAssets( posts, 2 );
  }

  const html   = await render( req.url, fallback, links );
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
    limit : POSTS_LIMIT,
    offset: 0,
    where : { userId },
  } );
}

export { router as usersRouter };