'use client';
export const calculateGridLines = (
  maxThreshold: number,
  numGridLines: number,
  spaceBetweenGridLines: number
) => {

  const results = [];
  // start with counter at 0
  let counter = 0;

  // take to max area and divide by the number of grid lines
  const step = maxThreshold / numGridLines;

  // then take the space between grid lines and divide by 2
  const halfSpace = spaceBetweenGridLines / 2;

  // then subtract the result from the first calculation
  for (let i = 0; i <= numGridLines; i++) {
    results.push(counter - halfSpace);
    counter += step;
    console.log("🚀 ~ counter:", counter, results);

  }

  results.pop();
  return results;
};
