const sharp = require( 'sharp' );
const glob  = require( 'glob' );

const GENERAL_IMAGE_WIDTH = 500;
const PROFILE_IMAGE_WIDTH = 80;

glob( '../public/images/**/*.jpg', {}, function ( err, files ) {
  files.forEach( path => {
    sharp( path )
      .resize({ width: path.includes( '/profiles/' ) ? PROFILE_IMAGE_WIDTH : GENERAL_IMAGE_WIDTH })
      .avif( {
        quality: 30,
        speed: 0,
      } )
      .toFile( path.replace( '.jpg', '.avif' ) );
  } );
} );