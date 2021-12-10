import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'serve-static';
import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';
import { MONTH_IN_MILLISECONDS, YEAR_IN_MILLISECONDS } from '../constants/time';


const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use( history() );

router.use(
  serveStatic( UPLOAD_PATH, {
    immutable: true,
    maxAge   : YEAR_IN_MILLISECONDS
  } ),
);

router.use(
  serveStatic( PUBLIC_PATH, {
    immutable: true,
    maxAge   : YEAR_IN_MILLISECONDS,
  } ),
);

router.use(
  serveStatic( CLIENT_DIST_PATH, {
    immutable: true,
    maxAge   : MONTH_IN_MILLISECONDS,
  } ),
);

export { router as staticRouter };
