import Router from 'express-promise-router';
import { rootRouter } from './pages/root';
import { termsRouter } from './pages/terms';
import { postsRouter } from './pages/posts';
import { usersRouter } from './pages/users';


const router = Router();

router.use( rootRouter );
router.use( termsRouter );
router.use( postsRouter );
router.use( usersRouter );

export { router as pageRouter };