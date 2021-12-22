import Router from 'express-promise-router';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';
import { Post, User } from '../../models';
import { PAGES } from '../../constants/pages';
import { IMAGE_FORMAT, POSTS_LIMIT, USER_PROFILE_LAZYLOAD_MIN_INDEX } from '../../../../constants/config';
import { collectPreAssets } from '../../ssr/collectPreAssets';
import { pathToPreloadLink } from '../../ssr/pathToPreloadLink';


const router = Router();

router.get( PAGES.users, async ( req, res ) => {
  const { username } = req.params;
  const { fallback, br } = res.locals;
  const user = await User.findOne( { where: { username } } );

  let links = '';

  if ( user ) {
    fallback[ `/api/v1/users/${ username }` ] = user;

    const posts = await getPosts( user.id );
    fallback[ `/api/v1/users/${ username }/posts` ] = [ posts ];

    links = pathToPreloadLink( `/images/profiles/${ user.profileImage.id }.${ IMAGE_FORMAT }` );
    links += collectPreAssets( posts, USER_PROFILE_LAZYLOAD_MIN_INDEX );
  }

  const html = await render( req.url, fallback, links );
  return res.status( 200 ).send( br ? await brotli( html ) : html );
} );

async function getPosts( userId ) {
  return await Post.findAll( {
    limit : POSTS_LIMIT,
    offset: 0,
    where : { userId },
  } );
}

export { router as usersRouter };