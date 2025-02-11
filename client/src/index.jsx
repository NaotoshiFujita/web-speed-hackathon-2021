import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { loadableReady } from '@loadable/component';
import { SWRConfigWrapper } from './components/swr';
import { requestIdleCallback } from './utils/requestIdleCallback';
import 'swr'; // Disables code splitting


const fallbackElm = document.getElementById( 'swr-fallback' );
let fallback = {};

if ( fallbackElm ) {
  try {
    fallback = JSON.parse( fallbackElm.textContent );
  } catch ( e ) {
    console.error( e );
  }

  loadableReady( render );
} else {
  render();
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
      <SWRConfigWrapper config={ config }>
        <AppContainer/>
      </SWRConfigWrapper>
    </BrowserRouter>,
    document.getElementById( 'app' )
  );
}

// Ensures the loading order.
const webfontLink = document.getElementById( 'webfont' );

if ( webfontLink ) {
  requestIdleCallback( () => {
    webfontLink.rel = 'stylesheet';
  } );
}
