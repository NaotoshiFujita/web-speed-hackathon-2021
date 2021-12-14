const sharp = require( 'sharp' );
const glob  = require( 'glob' );

const GENERAL_WIDTH       = 600;
const PROFILE_WIDTH       = 128;
const GENERAL_SMALL_WIDTH = 400;
const PROFILE_SMALL_WIDTH = 80;

glob( '../public/images/**/*.jpg', {}, function ( err, files ) {
  files.forEach( path => {
    const isProfile = path.includes( '/profiles/' );
    const options   = { quality: 30, alphaQuality: 0 };

    sharp( path )
      .resize( { width: isProfile ? PROFILE_WIDTH : GENERAL_WIDTH } )
      .webp( options )
      .toFile( path.replace( '.jpg', '.webp' ) );

    if ( isProfile ) {
      sharp( path )
        .resize( { width: PROFILE_SMALL_WIDTH } )
        .webp( options )
        .toFile( path.replace( '.jpg', '.small.webp' ) );
    } else {
      sharp( path )
        .resize( { width: GENERAL_SMALL_WIDTH } )
        .webp( options )
        .toFile( path.replace( '.jpg', '.small.webp' ) );
    }
  } );
} );