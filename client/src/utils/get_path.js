const IMAGE_FORMAT = 'webp';


/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  return `/images/${imageId}.${ IMAGE_FORMAT }`;
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
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `/images/profiles/${profileImageId}.${ IMAGE_FORMAT }`;
}

export { getImagePath, getMoviePath, getSoundPath, getSoundWavePath, getProfileImagePath };
