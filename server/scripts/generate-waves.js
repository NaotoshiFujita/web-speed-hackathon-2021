const { generateWave } = require( '../src/utils/sound-wave' );
const glob = require( 'glob' );
const path = require( 'path' );
const fs   = require( 'fs' ).promises;


async function generateWaves() {
  glob( '../public/sounds/**/*.mp3', {}, async function ( err, files ) {
    for ( const file of files ) {
      const data = await fs.readFile( file );
      const svg  = await build( data );
      const id   = path.basename( file, '.mp3' );

      await fs.writeFile( `../public/images/waves/${ id }.svg`, svg );
      console.log( id );
    }
  } );
}

generateWaves().catch( e => console.error( e ) );
