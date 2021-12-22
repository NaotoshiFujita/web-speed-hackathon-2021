import Router from 'express-promise-router';
import { rootRouter } from './pages/root';
import { termsRouter } from './pages/terms';
import { postsRouter } from './pages/posts';
import { usersRouter } from './pages/users';
import { PAGES } from '../constants/pages';
import { User } from '../models';
import { canUseBrotli } from '../utils/brotli';


const router = Router();

router.get( Object.values( PAGES ), async ( req, res, next ) => {
  const br = canUseBrotli( req );

  res.locals.fallback = {
    '/api/v1/me': await findUser( req ),
  };

  res.locals.br = br;
  res.locals.signedIn = !! req.session.userId;

  if ( br ) {
    res.set( 'Content-Encoding', 'br' );
  }

  res.set( 'Content-Type', 'text/html; charset=UTF-8' ).set( 'Cache-control', 'max-age=0, no-store' );
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