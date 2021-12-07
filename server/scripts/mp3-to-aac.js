const { createFFmpeg, fetchFile } = require( '@ffmpeg/ffmpeg' );
const glob = require( 'glob' );
const fs   = require( 'fs' );

const ffmpeg  = createFFmpeg( { log: true } );
const BITRATE = '128k';

async function convert() {
  await ffmpeg.load();

  glob( '../public/sounds/**/*.mp3', {}, async function ( err, files ) {
    for ( const file of files ) {
      const out  = file.replace( '.mp3', '.aac' );

      ffmpeg.FS( 'writeFile', 'source', await fetchFile( file ) );

      await ffmpeg.run(
        '-i',
        'source',
        '-c:a',
        'aac',
        '-b:a',
        BITRATE,
        'output.aac'
      );

      await fs.promises.writeFile( out, ffmpeg.FS( 'readFile', 'output.aac' ) );
    }
  } );
}

convert().catch( e => console.error( e ) );
