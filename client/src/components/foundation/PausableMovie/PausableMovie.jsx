import classNames from 'classnames';
import React, { useCallback } from 'react';

import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  const [ isPlaying, setIsPlaying ] = React.useState( true );

  const videoRef = React.useRef( null );
  const videoCallbackRef = useCallback(
    el => {
      if ( el ) {
        if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
          setIsPlaying( false );
          el.pause();
        } else {
          setIsPlaying( true );
          el.play()
        }

        videoRef.current = el;
      }
    },
    []
  );

  const handleClick = useCallback( () => {
    const { current } = videoRef;

    if ( current ) {
      setIsPlaying( isPlaying => {
        isPlaying ? current.pause() : current.play();
        return ! isPlaying;
      } );
    }
  }, [] );

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block h-full" onClick={ handleClick } type="button">
        <video
          ref={ videoCallbackRef }
          className="w-full h-full object-cover"
          src={ src }
          disablePictureInPicture
          loop
          muted
          playsInline
          preload="none"
        />
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            {
              'opacity-0 group-hover:opacity-100': isPlaying,
            },
          )}
        >
          <FontAwesomeIcon iconType={ isPlaying ? 'pause' : 'play' } />
        </div>
      </button>
    </AspectRatioBox>
  );
};

export { PausableMovie };
