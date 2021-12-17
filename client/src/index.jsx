import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { loadableReady } from '@loadable/component';
import { SWRConfig } from 'swr';
import 'swr'; // Disable splitting the file.


// Note that using a global value may worsen the TTI.
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
      <SWRConfig value={ config }>
        <AppContainer/>
      </SWRConfig>
    </BrowserRouter>,
    document.getElementById( 'app' )
  );
}