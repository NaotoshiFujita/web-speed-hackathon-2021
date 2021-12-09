import React from 'react';
import { ICONS } from './paths';

/**
 * @typedef {object} Props
 * @property {string} iconType
 * @property {'solid' | 'regular'} styleType
 */

/** @type {React.VFC<Props>} */
const FontAwesomeIcon = ({ iconType, styleType }) => {
  // ignores the styleType since using the subset icons.
  const [ viewBox, path ] = ICONS[ iconType ] || [];

  if ( ! viewBox ) {
    return null
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={ viewBox }
      className="font-awesome inline-block leading-none fill-current"
    >
      <path d={ path } />
    </svg>
  );
};

export { FontAwesomeIcon };
