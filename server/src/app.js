import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';
import { compressionRouter } from './routes/compression';


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
app.use( staticRouter );

export { app };
