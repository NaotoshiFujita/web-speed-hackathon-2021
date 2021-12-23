import css from '../../../dist/styles/main.css';
import icons from '../../../public/sprites/font-awesome/icons.svg';


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
  <style>${ css.toString() }</style>
  <link rel="prefetch" as="style" href="/styles/webfont.css" id="webfont">
</head>
<body>
  <div id="app">${ app }</div>
  <div id="modal"></div>
  <div hidden>${ icons }</div>
  <script id="swr-fallback" type="application/json">${ fallback }</script>
</body>
</html>
`
}