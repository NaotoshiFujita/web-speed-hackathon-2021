export function buildHtml( {
  queryState = '',
  app,
  scripts = '',
  css = '',
  links = ''
} ) {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charSet="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CAwitter</title>
  ${ links }   
  <style>${ css }</style>
</head>
<body>
  <div id="app">
    ${ app }
  </div>
  <div id="modal"></div>
  <script type="application/json" id="query-state">
    ${ queryState }
  </script>
  ${ scripts }
</body>
</html>
`.trim();
}