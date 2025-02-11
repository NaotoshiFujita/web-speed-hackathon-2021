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
  ${ links }<link rel="preload" as="style" href="/styles/webfont.css" id="webfont">
  ${ scripts }
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
`.replace( /\s\s+/g, '' ).replace( /\n/g, '' );
}

function readCSS() {
  return fs.readFileSync( join( CLIENT_DIST_PATH, 'styles/main.css' ), 'utf-8' );
}