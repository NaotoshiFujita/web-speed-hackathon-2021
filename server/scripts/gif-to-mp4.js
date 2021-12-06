const { createFFmpeg, fetchFile } = require( '@ffmpeg/ffmpeg' );
const glob = require( 'glob' );
const fs   = require( 'fs' );

const ffmpeg = createFFmpeg( { log: true } );
const BITRATE = '1000k';
const WIDTH   = '640';

async function convert() {
  await ffmpeg.load();

  glob( '../public/movies/**/*.gif', {}, async function ( err, files ) {
    for ( const file of files ) {
      const out  = file.replace( '.gif', '.mp4' );

      ffmpeg.FS( 'writeFile', 'source', await fetchFile( file ) );
      await ffmpeg.run(
        '-f',
        'gif',
        '-i',
        'source',
        '-c:v',
        'libx264',
        '-b:v',
        BITRATE,
        '-vf',
        `scale=${ WIDTH }:-1`,
        'output.mp4'
      );
      await fs.promises.writeFile( out, ffmpeg.FS( 'readFile', 'output.mp4' ) );
    }
  } );
}

convert().catch( e => console.error( e ) );
