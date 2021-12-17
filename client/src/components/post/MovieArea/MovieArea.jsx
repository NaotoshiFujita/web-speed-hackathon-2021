import React from 'react';

import { PausableMovie } from '../../foundation/PausableMovie';

/**
 * @typedef {object} Props
 * @property {Models.Movie} movie
 */

/** @type {React.VFC<Props>} */
const MovieArea = ({ movie }) => {
  return (
    <div className="h-full bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      <PausableMovie id={ movie.id } />
    </div>
  );
};

export { MovieArea };
