
export function sortKeys(keys: Array) {
  const sorted = keys.sort((a, b) => {
    if (a.keyDownloaded !== b.keyDownloaded) {
      return a.keyDownloaded ? -1 : 1;
    }

    if (a.keyStatus !== b.keyStatus) {
      return a.keyStatus === 'beta' ? 1 : -1;
    }

    return a.title > b.title;
  });

  return sorted;
}
