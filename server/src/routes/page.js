import Router from 'express-promise-router';
import { rootRouter } from './pages/root';
import { termsRouter } from './pages/terms';
import { postsRouter } from './pages/posts';
import { usersRouter } from './pages/users';
import { PAGES } from '../constants/pages';
import { QueryClient } from 'react-query';
import { User } from '../models';


const router = Router();

router.get( Object.values( PAGES ), async ( req, res, next ) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery( '/api/v1/me', () => findUser( req ) );
  res.locals.queryClient = queryClient;
  next();
} );

async function findUser( req ) {
  const { userId } = req.session;
  return userId && await User.findByPk( userId );
}

router.use( rootRouter );
router.use( termsRouter );
router.use( postsRouter );
router.use( usersRouter );

export { router as pageRouter };