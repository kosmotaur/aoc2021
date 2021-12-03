import depthIncreaseCount from './index';
import fc from 'fast-check';

const withNIncreasing = (n: number) =>
  fc.tuple(
    fc
      .array(fc.nat())
      .filter(
        (depths) =>
          depths.length > n &&
          depths.reduce(
            (increasingCount, depth, i) =>
              i > 0 && depth > depths[i - 1]
                ? increasingCount + 1
                : increasingCount,
            0
          ) === n
      ),
    fc.constant(n)
  );

describe('01', () => {
  it('has no increases for depths count less than 2', () => {
    fc.assert(
      fc.property(
        fc.array(fc.nat(), { minLength: 0, maxLength: 1 }),
        (depths) => {
          expect(depthIncreaseCount(depths)).toBe(0);
        }
      )
    );
  });
  it('calculates number of increases', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 3, max: 7 }).chain((n) => withNIncreasing(n)),
        ([depths, increases]) => {
          expect(depthIncreaseCount(depths)).toBe(increases);
        }
      )
    );
  });
});
