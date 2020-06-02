
/**
 * Sort keys alphabetically
 */
export function sortKeys(keys: Array) {
  return keys.sort(function (a, b) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
  })
}
