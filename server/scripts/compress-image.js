const sharp            = require( 'sharp' );
const glob             = require( 'glob-promise' );
const { IMAGE_FORMAT } = require( '../../constants/config' );
const seeds            = require( '../seeds/images.json' );
const path             = require( 'path' );
const fs               = require( 'fs' ).promises;

const GENERAL_SIZE       = 600;
const GENERAL_SMALL_SIZE = 400;
const PROFILE_SIZE       = 128;
const PROFILE_SMALL_SIZE = 80;
const OPTIONS            = { quality: 10, alphaQuality: 0 };


async function compress() {
  const files = await glob( '../public/images/**/*.jpg' );

  for ( const file of files ) {
    const id = path.basename( file, '.jpg' );

    if ( file.includes( '/profiles/' ) ) {
      compressImage( file, PROFILE_SIZE );
      compressImage( file, PROFILE_SMALL_SIZE, '.small' );
    } else {
      const seed = seeds.find( seed => seed.id === id );

      const { width, height } = await compressImage( file, GENERAL_SIZE );
      const { width: smallWidth, height: smallHeight } = await compressImage( file, GENERAL_SMALL_SIZE, '.small' );

      seed.width       = width;
      seed.height      = height;
      seed.smallWidth  = smallWidth;
      seed.smallHeight = smallHeight;
    }
  }

  await fs.writeFile( './seeds/images.json', JSON.stringify( seeds, null, 2 ) );
}

function compressImage( file, size, suffix = '', extension = 'jpg' ) {
  return sharp( file )
    .resize( { height: size, width: size, fit: 'inside' } )
    .webp( OPTIONS )
    .toFile( file.replace( `.${ extension }`, `${ suffix }.${ IMAGE_FORMAT }` ) );
}

compress().catch( console.error )

module.exports.compressImage = compressImage;