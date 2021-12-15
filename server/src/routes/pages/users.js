import Router from 'express-promise-router';
import { render } from '../../ssr/render';
import { brotli, canUseBrotli } from '../../utils/brotli';
import { Post, User } from '../../models';
import { PAGES } from '../../constants/pages';


const router = Router();

router.get( PAGES.users, async ( req, res ) => {
  const { username } = req.params;
  const { fallback } = res.locals;
  const user = await User.findOne( { where: { username } } );

  if ( user ) {
    fallback[ `/api/v1/users/${ username }` ] = user;
    fallback[ `/api/v1/users/${ username }/posts` ] = [ await getPosts( user.id ) ];
  }

  const html   = await render( req.url, fallback );
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