import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { loadableReady } from '@loadable/component';
import { requestIdleCallback } from './utils/requestIdleCallback';


window.addEventListener( 'load', () => {
  const dehydratedState = window.__REACT_QUERY_STATE__;

  const queryClient = new QueryClient( {
    defaultOptions: {
      queries: {
        retry               : false,
        refetchOnWindowFocus: false,
        refetchOnMount      : false,
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
    ReactDOM.hydrate(
      <BrowserRouter>
        <QueryClientProvider client={ queryClient }>
          <Hydrate state={ dehydratedState }>
            <AppContainer/>
          </Hydrate>
        </QueryClientProvider>
      </BrowserRouter>,
      document.getElementById( 'app' )
    );
  }
} );
