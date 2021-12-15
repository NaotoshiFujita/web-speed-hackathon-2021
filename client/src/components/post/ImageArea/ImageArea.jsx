import classNames from 'classnames';
import React from 'react';
import { getImagePath } from '../../../utils/get_path';
import { AspectRatioBox } from '../../foundation/AspectRatioBox';


/**
 * @typedef {object} Props
 * @property {Array<Models.Image>} images
 * @property {boolean} lazy
 */

// todo
/** @type {React.VFC<Props>} */
const ImageArea = ({ images, lazy = true }) => {
  return (
    <AspectRatioBox aspectHeight={9} aspectWidth={16}>
      <div
        className={ classNames(
          'grid gap-1 grid-cols-2 grid-rows-2 w-full h-full border border-gray-300 rounded-lg overflow-hidden',
          'content-visibility',
        ) }
        // className="grid gap-1 grid-cols-2 grid-rows-2 w-full h-full border border-gray-300 rounded-lg overflow-hidden"
      >
        {images.map((image, idx) => {
          const { length } = images;

          return (
            <div
              key={image.id}
              // CSS Grid で表示領域を指定する
              className={classNames('bg-gray-300 overflow-hidden', {
                'col-span-1': length !== 1,
                'col-span-2': length === 1,
                'row-span-1': length > 2 && (length !== 3 || idx !== 0),
                'row-span-2': length <= 2 || (length === 3 && idx === 0),
              })}
            >
              <img
                alt={ image.alt }
                className="w-full h-full object-cover"
                src={ getImagePath( image.id, length > 3 ) }
                loading={ lazy ? 'lazy' : null }
              />
            </div>
          );
        })}
      </div>
    </AspectRatioBox>
  );
};

export { ImageArea };
