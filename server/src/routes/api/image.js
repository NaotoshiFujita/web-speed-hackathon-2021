import { promises as fs } from 'fs';
import path from 'path';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertImage } from '../../converters/convert_image';
import { UPLOAD_PATH } from '../../paths';
import { IMAGE_FORMAT } from '../../../../constants/config';
import sharp from 'sharp';

// 変換した画像の拡張子
const EXTENSION = IMAGE_FORMAT;
const SIZE      = 600;

const router = Router();

// todo: has mismatch with the bulk action
router.post('/images', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const imageId = uuidv4();

  const converted = await convertImage(req.body, {
    // 画像の拡張子を指定する
    extension: EXTENSION,
    // 画像の縦サイズを指定する (undefined は元画像に合わせる)
    height: SIZE,
    // 画像の横サイズを指定する (undefined は元画像に合わせる)
    width: undefined,
  });

  const filePath = path.resolve(UPLOAD_PATH, `./images/${imageId}.${EXTENSION}`);

  await fs.writeFile(filePath, converted);

  // Use the same image as the small size.
  await fs.writeFile(filePath.replace( `.${EXTENSION}`, `.small.${ EXTENSION }` ), converted);

  const metadata = await sharp( filePath ).metadata();

  return res.status(200).type('application/json').send({
    id         : imageId,
    width      : metadata.width,
    height     : metadata.height,
    smallWidth : metadata.width,
    smallHeight: metadata.height,
  });
});

export { router as imageRouter };
