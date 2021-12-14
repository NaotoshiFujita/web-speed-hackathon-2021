import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { requestIdleCallback } from './utils/requestIdleCallback';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'preact';


const dehydratedState = document.getElementById( 'query-state' ).textContent;

const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
} );

if ( dehydratedState ) {
  loadableReady( () => {
    requestIdleCallback( render );
  } );
} else {
  render()
}

function render() {
  hydrate(
    <BrowserRouter>
      <QueryClientProvider client={ queryClient }>
        <Hydrate state={ JSON.parse( dehydratedState ) }>
          <AppContainer/>
        </Hydrate>
      </QueryClientProvider>
    </BrowserRouter>,
    document.getElementById( 'app' )
  );
}