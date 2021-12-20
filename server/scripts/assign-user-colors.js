const seeds               = require( '../seeds/users.json' );
const { promises: fs }    = require( 'fs' );
const { getAverageColor } = require( 'fast-average-color-node' );
const { IMAGE_FORMAT }    = require( '../../constants/config' );


async function assignUserColors() {
  for ( const seed of seeds ) {
    const { profileImageId } = seed;
    const { rgb } = await getAverageColor(
      `../public/images/profiles/${ profileImageId }.${ IMAGE_FORMAT }`,
      { mode: 'precision' }
    );

    seed.color = rgb;
    console.log( profileImageId, rgb );
  }

  await fs.writeFile( './seeds/users.json', JSON.stringify( seeds, null, 2 ) );
}

assignUserColors().catch( console.error );