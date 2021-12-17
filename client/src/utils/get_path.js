import { IMAGE_FORMAT } from '../constants/image';


/**
 * @param {string} imageId
 * @param {boolean} small
 * @returns {string}
 */
function getImagePath( imageId, small) {
  return `/images/${imageId}${ small ? '.small' : '' }.${ IMAGE_FORMAT }`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  return `/movies/${movieId}.webm`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getPosterPath(movieId) {
  return `/images/posters/${movieId}.${ IMAGE_FORMAT }`;
}


/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds/${soundId}.aac`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundWavePath(soundId) {
  return `/images/waves/${soundId}.svg`;
}

/**
 * @param {string} profileImageId
 * @param {boolean} small
 * @returns {string}
 */
function getProfileImagePath(profileImageId, small) {
  return `/images/profiles/${profileImageId}${ small ? '.small' : '' }.${ IMAGE_FORMAT }`;
}

export { getImagePath, getMoviePath, getPosterPath, getSoundPath, getSoundWavePath, getProfileImagePath };
