import React from 'react';
import { dehydrate, Hydrate, QueryClientProvider } from 'react-query';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { buildHtml } from './html';
import { AppContainer } from '../../../dist/modules/app';


export function render( url, queryClient ) {
  const dehydratedState = dehydrate( queryClient );
  const app = renderToString( (
    <StaticRouter location={ url } context={ {} }>
      <QueryClientProvider client={ queryClient }>
        <Hydrate state={ dehydratedState }>
          <AppContainer isSSR />
        </Hydrate>
      </QueryClientProvider>
    </StaticRouter>
  ) );

  return buildHtml(
    `window.__REACT_QUERY_STATE__ = ${ JSON.stringify( dehydratedState ) };`,
    app,
  );
}