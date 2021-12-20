const { fetchFile, createFFmpeg } = require( '@ffmpeg/ffmpeg' );
const glob                        = require( 'glob' );
const fs                          = require( 'fs' );
const { compress }                = require( './compress-image' );

const ffmpeg = createFFmpeg( { log: true } );

async function convert() {
  await ffmpeg.load();

  glob( '../public/movies/**/*.gif', {}, async function ( err, files ) {
    for ( const file of files ) {
      const out = file.replace( '/movies/', '/images/posters/' ).replace( '.gif', '.jpg' );

      ffmpeg.FS( 'writeFile', 'source', await fetchFile( file ) );

      await ffmpeg.run(
        '-f', 'gif',
        '-i', 'source',
        '-frames:v', '1',
        'output.jpg',
      );

      await fs.promises.writeFile( out, ffmpeg.FS( 'readFile', 'output.jpg' ) );

      // todo
      await compress( out, 600 );
      await fs.promises.unlink( out );
    }
  } );
}

convert().catch( e => console.error( e ) );
