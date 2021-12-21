import fs from 'fs';
import { join } from 'path';
import { CLIENT_DIST_PATH, PUBLIC_PATH } from '../paths';


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
  ${ scripts }
  ${ links }
<!--  <link rel="prefetch" as="style" href="/styles/webfont.css" id="webfont">-->
  <style>${ readCSS() }</style>
</head>
<body>
  <div id="app">
    ${ app }
  </div>
  <div id="modal"></div>
  <div hidden>
  ${ readIcons() }
  </div>
  <script id="swr-fallback" type="application/json">
    ${ fallback }
  </script>
</body>
</html>
`.replace( /(\s\s+|\n)/g, '' );
}

function readIcons() {
  return fs.readFileSync( join( PUBLIC_PATH, 'sprites/font-awesome/icons.svg' ), 'utf-8' );
}

function readCSS() {
  return fs.readFileSync( join( CLIENT_DIST_PATH, 'styles/main.css' ), 'utf-8' );
}