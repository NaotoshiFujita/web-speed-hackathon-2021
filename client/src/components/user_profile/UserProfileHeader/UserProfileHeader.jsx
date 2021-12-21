import FastAverageColor from 'fast-average-color';
import React from 'react';

import { getProfileImagePath } from '../../../utils/get_path';
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { Time } from '../../foundation/Time';
import { PROFILE_IMAGE_SIZE } from '../../../../../constants/config';

/**
 * @typedef {object} Props
 * @property {Models.User} user
 */

/** @type {React.VFC<Props>} */
const UserProfileHeader = ({ user }) => {
  const [averageColor, setAverageColor] = React.useState( user.color || null );

  // todo
  const imageCallbackRef = React.useCallback( el => {
    if ( el ) {
      if ( el.complete ) {
        setTimeout( () => {
          setAverageColor( extractRgb( el ) );
        } );
      } else {
        el.onload = e => {
          setAverageColor( extractRgb( e.currentTarget ) );
        }
      }
    }
  }, [] );

  return (
    <header className="relative">
      <div className="h-32 bg-gray-300" style={{ backgroundColor: averageColor }} />
      <div className="absolute left-2/4 m-0 w-28 h-28 bg-gray-300 border border-gray-300 rounded-full overflow-hidden transform -translate-x-1/2 -translate-y-1/2 sm:w-32 sm:h-32">
        <img
          alt=""
          ref={ averageColor ? null : imageCallbackRef }
          src={getProfileImagePath(user.profileImage.id)}
          width={ PROFILE_IMAGE_SIZE }
          height={ PROFILE_IMAGE_SIZE }
        />
      </div>
      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="pt-2">{user.description}</p>
        <p className="pt-2 text-gray-600 text-sm">
          <span className="pr-1">
            <FontAwesomeIcon iconType="calendar-alt" />
          </span>
          <span>
            <Time time={ user.createdAt }/>
            からサービスを利用しています
          </span>
        </p>
      </div>
    </header>
  );
};

function extractRgb( image ) {
  const fac = new FastAverageColor();
  const { rgb } = fac.getColor( image, { mode: 'precision' } );
  return rgb;
}

export { UserProfileHeader };
