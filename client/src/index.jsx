import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { loadableReady } from '@loadable/component';
import { SWRConfigWrapper } from './components/swr';
import { requestIdleCallback } from './utils/requestIdleCallback';


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
// document.head.insertAdjacentHTML(
//   'beforeend',
//   `<link rel="preload" as="style" href="/styles/webfont.css" id="webfont">`
// );

const link = document.createElement( 'link' );
link.rel  = 'preload';
link.as   = 'style';
link.href = '/styles/webfont.css';

document.head.append( link );

requestIdleCallback( () => {
  link.rel = 'stylesheet';
} );

// const webfontLink = document.getElementById( 'webfont' );

// if ( webfontLink ) {
//   requestIdleCallback( () => {
//     webfontLink.rel = 'stylesheet';
//   } );
// }

