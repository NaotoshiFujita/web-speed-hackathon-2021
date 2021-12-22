import { resolve } from 'path';


const PUBLIC_PATH      = resolve( __dirname, '../../public' );
const UPLOAD_PATH      = resolve( __dirname, '../../upload' );
const CLIENT_DIST_PATH = resolve( __dirname, '../../dist' );
const CACHE_PATH       = resolve( __dirname, '../cache' );
const DATABASE_PATH    = resolve( __dirname, '../database.sqlite' );

export { PUBLIC_PATH, CLIENT_DIST_PATH, CACHE_PATH, DATABASE_PATH, UPLOAD_PATH };
