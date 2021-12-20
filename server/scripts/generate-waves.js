const { decode, svg } = require( '../src/utils/sound-wave' );
const glob  = require( 'glob-promise' );
const path  = require( 'path' );
const fs    = require( 'fs' ).promises;
const seeds = require( '../seeds/sounds.json' );


async function generateWaves() {
  const files = await glob( '../public/sounds/**/*.mp3' );

  for ( const file of files ) {
    const id   = path.basename( file, '.mp3' );
    const seed = seeds.find( seed => seed.id === id );
    const data = await fs.readFile( file );
    const wave = await decode( data );

    await fs.writeFile( `../public/images/waves/${ id }.svg`, svg( wave.max, wave.peaks ) );
    seed.wave = JSON.stringify( wave );
    console.log( id );
  }

  await fs.writeFile( './seeds/sounds.json', JSON.stringify( seeds, null, 2 ) );
}

generateWaves().catch( e => console.error( e ) );
