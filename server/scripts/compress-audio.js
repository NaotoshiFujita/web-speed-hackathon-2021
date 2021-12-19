const { createFFmpeg, fetchFile } = require( '@ffmpeg/ffmpeg' );
const { AUDIO_FORMAT } = require( '../../constants/config' );
const glob = require( 'glob' );
const fs   = require( 'fs' );

const ffmpeg  = createFFmpeg( { log: true } );
const BITRATE = '128k';

async function convert() {
  await ffmpeg.load();

  glob( '../public/sounds/**/*.mp3', {}, async function ( err, files ) {
    for ( const file of files ) {
      const out  = file.replace( '.mp3', `.${ AUDIO_FORMAT }` );

      ffmpeg.FS( 'writeFile', 'source', await fetchFile( file ) );

      await ffmpeg.run(
        '-i',
        'source',
        '-c:a',
        'aac',
        '-b:a',
        BITRATE,
        `output${ AUDIO_FORMAT }`
      );

      await fs.promises.writeFile( out, ffmpeg.FS( 'readFile', `output.${ AUDIO_FORMAT }` ) );
    }
  } );
}

convert().catch( e => console.error( e ) );
