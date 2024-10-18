
export const calculateGridLines = (maxLength: number, numOfLines: number) => {
  const halfStep = maxLength / numOfLines / 2,
    results = [];
  let counter = 0;
  while (counter < maxLength) {
    counter += halfStep;
    results.push(counter);
  }
  return results;
};