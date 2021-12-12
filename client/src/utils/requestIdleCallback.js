export function requestIdleCallback( callback ) {
  if ( typeof window !== 'undefined' && 'requestIdleCallback' in window ) {
    window.requestIdleCallback( callback );
  } else {
    setTimeout( callback );
  }
}