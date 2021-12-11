import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { QueryClient, QueryClientProvider } from 'react-query';

// Array.from( document.getElementsByTagName( 'img' ) ).forEach( img => {
//   new Image().src = img.src;
// } );

const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
} );

ReactDOM.hydrate(
  <BrowserRouter>
    <QueryClientProvider client={ queryClient }>
      <AppContainer/>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById( 'app' ),
);