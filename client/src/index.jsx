import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from './containers/AppContainer';
import { getImagePath, getProfileImagePath } from './utils/get_path';
import { fetchJSON } from './utils/fetchers';

// prefetch().catch( console.error )

ReactDOM.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.getElementById( 'app' ),
);

// async function prefetch() {
//   const posts  = await fetchJSON( '/api/v1/posts?limit=7&offset=0' );
//   const images = [];
//
//   if ( posts ) {
//     posts.forEach( post => {
//       images.push( ...post.images.map( image => getImagePath( image.id ) ) );
//       images.push( getProfileImagePath( post.user.profileImage.id ) )
//     } );
//
//     if ( images.length ) {
//       document.head.insertAdjacentHTML(
//         'beforeend',
//         images.map( path => `<link rel="preload" href="${ path }" as="image">` ).join( '' )
//       );
//     }
//   }
// }
