import Router from 'express-promise-router';
import { rootRouter } from './pages/root';
import { termsRouter } from './pages/terms';
import { postsRouter } from './pages/posts';
import { usersRouter } from './pages/users';
import { PAGES } from '../constants/pages';
import { User } from '../models';


const router = Router();

router.get( Object.values( PAGES ), async ( req, res, next ) => {
  res.locals.fallback = {
    '/api/v1/me': await findUser( req ),
  };

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