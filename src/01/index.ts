const countIncreasingDepths = (depths: number[]): number =>
  depths.reduce(
    (increasingCount, depth, i) =>
      i > 0 && depth > depths[i - 1] ? increasingCount + 1 : increasingCount,
    0
  );

export default countIncreasingDepths;
