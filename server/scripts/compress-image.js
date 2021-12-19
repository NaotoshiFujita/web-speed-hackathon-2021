const sharp            = require( 'sharp' );
const glob             = require( 'glob' );
const { IMAGE_FORMAT } = require( '../../constants/config' );

const GENERAL_SIZE       = 600;
const GENERAL_SMALL_SIZE = 400;
const PROFILE_SIZE       = 128;
const PROFILE_SMALL_SIZE = 80;
const OPTIONS             = { quality: 30, alphaQuality: 0 };


glob( '../public/images/**/*.jpg', {}, function ( err, files ) {
  files.forEach( path => {
    if ( path.includes( '/profiles/' ) ) {
      compress( path, PROFILE_SIZE );
      compress( path, PROFILE_SMALL_SIZE, '.small' );
    } else {
      compress( path, GENERAL_SIZE );
      compress( path, GENERAL_SMALL_SIZE, '.small' );
    }
  } );
} );

function compress( path, size, suffix = '', extension = 'jpg' ) {
  sharp( path )
    .resize( { height: size, width: size, fit: 'inside' } )
    .webp( OPTIONS )
    .toFile( path.replace( `.${ extension }`, `${ suffix }.${ IMAGE_FORMAT }` ) );
}

module.exports.compress = compress;