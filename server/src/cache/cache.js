import { promises as fs } from 'fs';
import { join } from 'path';
import { CACHE_PATH } from '../paths';
import { brotli } from '../utils/brotli';
import { render } from '../ssr/render';
import { collectPreAssets } from '../ssr/collectPreAssets';
import { POSTS_LIMIT, TIMELINE_LAZYLOAD_MIN_INDEX } from '../../../constants/config';
import { PAGES } from '../constants/pages';
import { Post } from '../models';
import { createHash } from 'crypto';


export async function create( url, content ) {
  await fs.writeFile( toPath( url ), content );
  await fs.writeFile( toPath( url, 'br' ), await brotli( content ) );
}

export async function retrieve( url, br ) {
  return await fs.readFile( toPath( url, br ? 'br' : 'html' ) );
}

export async function getPath( url, br ) {
  const path = toPath( url, br ? 'br' : 'html' );

  try {
    await fs.access( path );
    return path;
  } catch ( e ) {
    return undefined;
  }
}

export async function remove( url ) {
  await fs.unlink( toPath( url ) );
  await fs.unlink( toPath( url, 'br' ) );
}

export async function clear() {
  await fs.rm( CACHE_PATH, { recursive: true, force: true } );
}

export async function initialize() {
  await clear();
  await fs.mkdir( CACHE_PATH );
  await generate();
}

function toHash( url ) {
  return createHash( 'sha1' ).update( url ).digest( 'hex' );
}

function toPath( url, extension = 'html' ) {
  return join( CACHE_PATH, `${ toHash( url ) }.${ extension }` );
}

async function generate() {
  const posts = await Post.findAll( { limit : POSTS_LIMIT, offset: 0 } );
  const root = await render( PAGES.root, {
    '/api/v1/me'   : null,
    '/api/v1/posts': [ posts ],
  }, collectPreAssets( posts, TIMELINE_LAZYLOAD_MIN_INDEX ) );

  await create( PAGES.root, root );

  const terms = await render( PAGES.terms, {
    '/api/v1/me': null,
  } );

  await create( PAGES.terms, terms );
}