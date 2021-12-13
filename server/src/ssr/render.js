import React from 'react';
import { dehydrate, Hydrate, QueryClientProvider } from 'react-query';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { buildHtml } from './html';
import { AppContainer } from '../../../dist/modules/app';
import { resolve } from 'path';
import { CLIENT_DIST_PATH } from '../paths';
import { ChunkExtractor } from '@loadable/server';


export async function render( url, queryClient ) {
  const dehydratedState = dehydrate( queryClient );
  const extractor       = createExtractor();

  const app = extractor.collectChunks( (
    <StaticRouter location={ url } context={ {} }>
      <QueryClientProvider client={ queryClient }>
        <Hydrate state={ dehydratedState }>
          <AppContainer />
        </Hydrate>
      </QueryClientProvider>
    </StaticRouter>
  ) );

  const html = renderToString( app );
  const css  = await extractor.getCssString();

  return buildHtml( {
    queryState: `window.__REACT_QUERY_STATE__ = ${ JSON.stringify( dehydratedState ) };`,
    app       : html,
    scripts   : extractor.getScriptTags(),
    // links     : extractor.getLinkTags(),
    css,
  } );
}

function createExtractor() {
  const statsFile = resolve( CLIENT_DIST_PATH, './loadable-stats.json' );
  return new ChunkExtractor( { statsFile } );
}