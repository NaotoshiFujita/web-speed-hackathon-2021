import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';
import { compressionRouter } from './routes/compression';
import { pageRouter } from './routes/page';
import { render } from './ssr/render';


const app = Express();

app.set( 'trust proxy', true );

app.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);

app.use( bodyParser.json() );
app.use( bodyParser.raw( { limit: '10mb' } ) );


app.use( '/api/v1', apiRouter );
app.use( compressionRouter );
app.use( pageRouter );
app.use( staticRouter );

app.use( async ( req, res ) => {
  const { fallback } = res.locals;

  return res
    .set( 'Content-Type', 'text/html; charset=UTF-8' )
    .set( 'Cache-control', 'max-age=0, no-store' )
    .status( 404 )
    .send( await render( req.url, fallback ) );
} );

export { app };
