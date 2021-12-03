type Depth = number;
export type Depths = Depth[];

const countIncreasingDepths = (depths: number[], windowWidth = 1): number =>
  depths.length <= windowWidth
    ? 0
    : depths.reduce(
        (increasingCount, depth, i) =>
          i > 0 && depth > depths[i - 1]
            ? increasingCount + 1
            : increasingCount,
        0
      );

export default countIncreasingDepths;
