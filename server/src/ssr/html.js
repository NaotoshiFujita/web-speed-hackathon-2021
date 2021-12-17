import fs from 'fs';
import { join } from 'path';
import { CLIENT_DIST_PATH } from '../paths';


export function buildHtml( {
  fallback = '',
  app,
  scripts = '',
  links = ''
} ) {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charSet="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CAwitter</title>
  <style>${ readCSS() }</style>
  ${ scripts }
  <link rel="preload" as="style" href="/styles/webfont.css" onload="${ ONLOAD_HANDLER }">
  ${ links }
</head>
<body>
  <div id="app">
    ${ app }
  </div>
  <div id="modal"></div>
  <script id="swr-fallback" type="application/json">
    ${ fallback }
  </script>
</body>
</html>
`;
}

const ONLOAD_HANDLER = `
this.onload = null;
requestIdleCallback( () => { this.rel = 'stylesheet' } );
`.replace( /\n|\s\s+/g, '' );

// const ONLOAD_HANDLER = `
// this.onload = null;
// window.addEventListener( 'load', () => {
//   setTimeout( () => { this.rel = 'stylesheet' } );
// } );
// `.replace( /\n|\s\s+/g, '' );

function readCSS() {
  return fs.readFileSync( join( CLIENT_DIST_PATH, 'styles/main.css' ), 'utf-8' );
}