export const arraysDiffer = (arr1, arr2, compareFunc) => {
  if(arr1.length !== arr2.length) return true;
  for(let i = 0; i < arr1.length; i++) {
    if(!compareFunc(arr1[i], arr2[i])) {
      return true;
    }
  }
  return false;
};

export const reshape = (arr, cols) => {
  var copy = arr.slice(0); // Copy all elements.
  const retVal = [];
  for (let r = 0; r < arr.length; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (i < copy.length) {
        row.push(copy[i]);
      }
    }
    retVal.push(row);
  }
  return retVal.filter(a => a.length > 0);
};
