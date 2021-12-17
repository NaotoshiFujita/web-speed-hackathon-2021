const { createFFmpeg, fetchFile } = require( '@ffmpeg/ffmpeg' );
const glob = require( 'glob' );
const fs   = require( 'fs' );

const ffmpeg = createFFmpeg( { log: true } );
const BITRATE = '300k';
const WIDTH   = '500';


async function convert() {
  await ffmpeg.load();

  glob( '../public/movies/**/*.gif', {}, async function ( err, files ) {
    for ( const file of files ) {
      const out  = file.replace( '.gif', '.webm' );

      ffmpeg.FS( 'writeFile', 'source', await fetchFile( file ) );

      await ffmpeg.run(
        '-f', 'gif',
        '-i', 'source',
        '-quality', 'good',
        '-b:v', BITRATE,
        '-crf', '12',
        '-pix_fmt', 'yuv420p',
        '-movflags', 'faststart',
        '-vf', `scale=${ WIDTH }:-1`,
        'output.webm'
      );

      await fs.promises.writeFile( out, ffmpeg.FS( 'readFile', 'output.webm' ) );
    }
  } );
}

convert().catch( e => console.error( e ) );
