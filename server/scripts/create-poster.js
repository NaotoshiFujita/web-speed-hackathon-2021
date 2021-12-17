const { fetchFile, createFFmpeg } = require( '@ffmpeg/ffmpeg' );
const glob                        = require( 'glob' );
const fs                          = require( 'fs' );
const { compress }                = require( './compress-image' );

const ffmpeg = createFFmpeg( { log: true } );

async function convert() {
  await ffmpeg.load();

  glob( '../public/movies/**/*.gif', {}, async function ( err, files ) {
    for ( const file of files ) {
      const out = file.replace( '/movies/', '/images/posters/' ).replace( '.gif', '.webp' );

      ffmpeg.FS( 'writeFile', 'source', await fetchFile( file ) );

      await ffmpeg.run(
        '-f', 'gif',
        '-i', 'source',
        '-frames:v', '1',
        'output.webp',
      );

      await fs.promises.writeFile( out, ffmpeg.FS( 'readFile', 'output.webp' ) );

      // todo
      compress( out, 600, '', 'webp' );
    }
  } );
}

convert().catch( e => console.error( e ) );
