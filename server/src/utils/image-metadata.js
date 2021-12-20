import sharp from 'sharp';


export async function extractImageMetadata( path ) {
  return await sharp().metadata();
}
