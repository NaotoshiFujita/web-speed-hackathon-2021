import React from 'react';
import { AppContainer } from '../../../../dist/modules/app';
import { StaticRouter } from 'react-router-dom/server';
import fs from 'fs';
import { join } from 'path';
import { CLIENT_DIST_PATH } from '../../paths';
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from 'react-query';

// todo location
export function Html( { queryClient, ...props } ) {
  const context = {};
  const dehydratedState = dehydrate( queryClient );

  return (
    <html lang="ja">
    <head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>CAwitter</title>

      {/*<link rel="preload" href="/scripts/main.js" as="script"/>*/}

      {/*{ collectImages( props.posts ).map( path => <link key={ path } rel="preload" href={ path } as="image"/> ) }*/}

      <style>{ readCSS() }</style>
      <script>
        { `window.__REACT_QUERY_STATE__ = ${ JSON.stringify( dehydratedState ) };` }
      </script>
    </head>
    <body>
      <div id="app">
        <StaticRouter location={ props.url } context={ context }>
          <QueryClientProvider client={ queryClient }>
            <Hydrate state={ dehydratedState }>
              <AppContainer isSSR activeUser={ props.activeUser || null } posts={ props.posts }/>
            </Hydrate>
          </QueryClientProvider>
        </StaticRouter>
      </div>
      <div id="modal"/>
      <script type="module" src="/scripts/main.js" async={ true }/>
    </body>
    </html>
  );
}

function readCSS() {
  return fs.readFileSync( join( CLIENT_DIST_PATH, 'styles/main.css' ), 'utf-8' );
}

function collectImages( posts ) {
  const images = [];

  if ( posts ) {
    posts.forEach( post => {
      images.push( ...post.images.map( image => `/images/${ image.id }.avif` ) );
      images.push( `/images/profiles/${ post.user.profileImage.id}.avif ` );
    } );
  }

  return images;
}