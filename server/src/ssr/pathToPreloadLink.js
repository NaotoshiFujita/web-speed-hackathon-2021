export function pathToPreloadLink( path, as = 'image' ) {
  return `<link rel="preload" href="${ path }" as="${ as }">`;
}