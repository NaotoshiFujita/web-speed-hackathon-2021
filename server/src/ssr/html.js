import fs from 'fs';
import { join } from 'path';
import { CLIENT_DIST_PATH } from '../paths';


export function buildHtml( queryState, app, head = '' ) {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charSet="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CAwitter</title>
  ${ head }
  <link rel="preload" href="/scripts/main.js" as="script">
  <style>${ readCSS() }</style>
</head>
<body>
  <div id="app">
    ${ app }
  </div>
  <div id="modal"></div>
  <script>
    ${ queryState }
  </script>
  <script src="/scripts/main.js"></script>
</body>
</html>
`.trim();
}

function readCSS() {
  return fs.readFileSync( join( CLIENT_DIST_PATH, 'styles/main.css' ), 'utf-8' );
}