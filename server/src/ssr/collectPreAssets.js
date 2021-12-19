import { IMAGE_FORMAT } from '../constants/image';


export function collectPreAssets( items, endIndex ) {
  const images = [];

  if ( items ) {
    items.slice( 0, endIndex ).forEach( item => {
      if ( item.images ) {
        images.push( ...item.images.map( image => {
          return `/images/${ image.id }${ item.images.length > 3 ? '.small' : '' }.${ IMAGE_FORMAT }`;
        } ) );
      }

      if ( item.user ) {
        images.push( `/images/profiles/${ item.user.profileImage.id }.small.${ IMAGE_FORMAT }` );
      }

      if ( item.sound ) {
        images.push( `/images/waves/${ item.sound.id }.svg` );
      }
    } );
  }

  return images.map( path => `<link rel="preload" href="${ path }" as="image">` ).join( '' );
}