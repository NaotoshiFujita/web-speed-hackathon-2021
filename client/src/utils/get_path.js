const IMAGE_FORMAT = 'webp';


/**
 * @param {string} imageId
 * @param {boolean} small
 * @returns {string}
 */
function getImagePath(imageId, small = false) {
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
function getProfileImagePath(profileImageId, small = false) {
  return `/images/profiles/${profileImageId}${ small ? '.small' : '' }.${ IMAGE_FORMAT }`;
}

export { getImagePath, getMoviePath, getSoundPath, getSoundWavePath, getProfileImagePath };
