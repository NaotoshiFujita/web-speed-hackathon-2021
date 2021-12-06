const sharp = require( 'sharp' );
const glob  = require( 'glob' );

glob( '../public/images/**/*.jpg', {}, function ( err, files ) {
  files.forEach( path => {
    sharp( path )
      .resize({ width: 500 })
      .avif()
      .toFile( path.replace( '.jpg', '.avif' ) );
  } );
} );