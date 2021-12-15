import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { loadableReady } from '@loadable/component';
import { requestIdleCallback } from './utils/requestIdleCallback';
import { SWRConfig } from 'swr';


window.addEventListener( 'load', () => {
  const fallback = window.__SWR_FALLBACK__;

  if ( fallback ) {
    loadableReady( () => {
      requestIdleCallback( render );
    } );
  } else {
    render()
  }

  const config = {
    shouldRetryOnError: false,
    revalidateIfStale : false,
    revalidateOnFocus : false,
    fallback,
  };

  function render() {
    ReactDOM.hydrate(
      <BrowserRouter>
        <SWRConfig value={ config }>
          <AppContainer/>
        </SWRConfig>
      </BrowserRouter>,
      document.getElementById( 'app' )
    );
  }
} );
