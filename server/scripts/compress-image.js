const sharp = require( 'sharp' );
const glob  = require( 'glob' );

const GENERAL_IMAGE_WIDTH = 500;
const PROFILE_IMAGE_WIDTH = 128;

glob( '../public/images/**/*.jpg', {}, function ( err, files ) {
  files.forEach( path => {
    const isProfile = path.includes( '/profiles/' );

    sharp( path )
      .resize({ width: isProfile ? PROFILE_IMAGE_WIDTH : GENERAL_IMAGE_WIDTH })
      .avif( {
        quality: isProfile ? 20 : 30,
        speed: 0,
      } )
      .toFile( path.replace( '.jpg', '.avif' ) );
  } );
} );