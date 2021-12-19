import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { loadableReady } from '@loadable/component';
import { SWRConfigWrapper } from './components/swr';


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
