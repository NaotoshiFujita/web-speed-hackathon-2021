import Router from 'express-promise-router';
import { rootRouter } from './pages/root';
import { termsRouter } from './pages/terms';
import { postsRouter } from './pages/posts';
import { usersRouter } from './pages/users';
import { PAGES } from '../constants/pages';
import { User } from '../models';


const router = Router();

router.get( Object.values( PAGES ), async ( req, res, next ) => {
  // br, gzip and html are acceptable.
  // Note that br seems to take more time for compression than gzip, which worsen SI.
  const type = 'gzip';

  res.locals.fallback = {
    '/api/v1/me': await findUser( req ),
  };

  res.locals.type     = type;
  res.locals.signedIn = !! req.session.userId;

  if ( type && type !== 'html' ) {
    res.set( 'Content-Encoding', type );
  }

  res.set( 'Content-Type', 'text/html; charset=UTF-8' ).set( 'Cache-control', 'max-age=1' );
  next();
} );

async function findUser( req ) {
  const { userId } = req.session;
  return userId ? await User.findByPk( userId ) : null;
}

router.use( rootRouter );
router.use( termsRouter );
router.use( postsRouter );
router.use( usersRouter );

export { router as pageRouter };