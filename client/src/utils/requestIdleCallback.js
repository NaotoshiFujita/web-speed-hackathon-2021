import { isBrowser } from './isBrowser';


export function requestIdleCallback( callback ) {
  if ( isBrowser() && 'requestIdleCallback' in window ) {
    window.requestIdleCallback( callback );
  } else {
    requestAnimationFrame( callback );
  }
}