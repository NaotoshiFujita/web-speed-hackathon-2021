import { IMAGE_FORMAT } from '../../../constants/config';
import { pathToPreloadLink } from './pathToPreloadLink';


export function collectPreAssets( items, endIndex ) {
  const images = [];

  if ( items ) {
    items.slice( 0, endIndex ).forEach( item => {
      if ( item.images ) {
        images.push( ...item.images.map( image => {
          return `/images/${ image.id }${ item.images.length > 3 ? '.small' : '' }.${ IMAGE_FORMAT }`;
        } ) );
      }
    } );
  }

  return images.map( path => pathToPreloadLink( path ) ).join( '' );
}