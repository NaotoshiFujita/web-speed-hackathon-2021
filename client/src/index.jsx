import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppContainer } from './containers/AppContainer';


const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
} );

document.addEventListener( 'DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <QueryClientProvider client={ queryClient }>
        <AppContainer />
      </QueryClientProvider>
    </BrowserRouter>,
    document.getElementById( 'app' ),
  );
} );