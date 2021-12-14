import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { loadableReady } from '@loadable/component';


const queryState = document.getElementById( 'query-state' );

const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
} );

if ( queryState ) {
  loadableReady( () => setTimeout( render ) );
} else {
  render()
}

function render() {
  ReactDOM.hydrate(
    <BrowserRouter>
      <QueryClientProvider client={ queryClient }>
        <Hydrate state={ queryState ? JSON.parse( queryState.textContent ) : null }>
          <AppContainer/>
        </Hydrate>
      </QueryClientProvider>
    </BrowserRouter>,
    document.getElementById( 'app' )
  );
}