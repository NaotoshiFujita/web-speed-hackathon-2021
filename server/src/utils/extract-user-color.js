import { getAverageColor } from 'fast-average-color-node';
import { resolve } from 'path';
import { PUBLIC_PATH } from '../paths';
import { IMAGE_FORMAT } from '../../../constants/config';


export async function extractUserColor( profileImageId ) {
  const { rgb } = await getAverageColor(
    resolve( PUBLIC_PATH, `./images/profiles/${ profileImageId }.${ IMAGE_FORMAT }` ),
    { mode: 'precision' }
  );

  return rgb;
}