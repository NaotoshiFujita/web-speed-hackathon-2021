import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 * @property {boolean} lazy
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src, lazy = true }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        alt={ alt }
        className={ 'relative w-full h-full object-cover' }
        src={ src }
        loading={ lazy ? 'lazy' : '' }
      />
    </div>
  );
};

export { CoveredImage };
