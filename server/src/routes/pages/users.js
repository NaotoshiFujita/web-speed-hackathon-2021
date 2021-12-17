import Router from 'express-promise-router';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';
import { Post, User } from '../../models';
import { PAGES } from '../../constants/pages';
// import { collectPreAssets } from '../../ssr/collectLinks';
import { resolve } from 'path';
import { PUBLIC_PATH } from '../../paths';
import { getAverageColor } from 'fast-average-color-node';
import { IMAGE_FORMAT } from '../../constants/image';


const router = Router();

router.get( PAGES.users, async ( req, res ) => {
  const { username } = req.params;
  const { fallback } = res.locals;
  const user = await User.findOne( { where: { username } } );

  let links = '';

  if ( user ) {
    fallback[ `/api/v1/users/${ username }` ] = user;

    const posts = await getPosts( user.id );
    fallback[ `/api/v1/users/${ username }/posts` ] = [ posts ];

    // todo hack
    user.color = await getColor( user.profileImage.id );

    // links = collectPreAssets( posts, 3 );
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
    limit : 7, // todo
    offset: 0,
    where : { userId },
  } );
}

async function getColor( profileImageId ) {
  const { rgb } = await getAverageColor(
    resolve( PUBLIC_PATH, `./images/profiles/${ profileImageId }.${ IMAGE_FORMAT }` ),
    { mode: 'precision' }
  );

  return rgb;
}

export { router as usersRouter };