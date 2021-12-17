const sharp = require( 'sharp' );
const glob  = require( 'glob' );

const IMAGE_FORMAT        = 'avif';
const GENERAL_WIDTH       = 600;
const GENERAL_SMALL_WIDTH = 400;
const PROFILE_WIDTH       = 128;
const PROFILE_SMALL_WIDTH = 80;
const OPTIONS             = { quality: 30, alphaQuality: 0 };


glob( '../public/images/**/*.jpg', {}, function ( err, files ) {
  files.forEach( path => {
    if ( path.includes( '/profiles/' ) ) {
      compress( path, PROFILE_WIDTH );
      compress( path, PROFILE_SMALL_WIDTH, '.small' );
    } else {
      compress( path, GENERAL_WIDTH );
      compress( path, GENERAL_SMALL_WIDTH, '.small' );
    }
  } );
} );

function compress( path, width, suffix = '', extension = 'jpg' ) {
  sharp( path )
    .resize( { height: width, width, fit: 'inside' } )
    .webp( OPTIONS )
    .toFile( path.replace( `.${ extension }`, `${ suffix }.${ IMAGE_FORMAT }` ) );
}

module.exports.compress = compress;