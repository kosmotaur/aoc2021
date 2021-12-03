import depthIncreaseCount from './countIncreasingDepths';
import fc, { Arbitrary } from 'fast-check';
import Chance from 'chance';

const chance = Chance();

type Depth = number;
type Depths = Depth[];

const withNIncreasing: (n: number) => Arbitrary<Depths> = (n) =>
  fc.array(fc.nat(), { minLength: n + 1 }).map((depths) => {
    const sortedDecreasingDepths = depths.sort((a, b) => b - a);
    const indicesBeforeIncreaseOfDepth = chance
      .unique(
        () =>
          chance.natural({ min: 0, max: sortedDecreasingDepths.length - 2 }),
        n
      )
      .sort((a, b) => a - b);

    return indicesBeforeIncreaseOfDepth.reduce((acc, index) => {
      acc[index + 1] = acc[index] + chance.natural({ min: 1 });

      return acc;
    }, sortedDecreasingDepths);
  });

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
        fc
          .integer({ min: 1, max: 10 })
          .chain((n) => fc.tuple(withNIncreasing(n), fc.constant(n))),
        ([depths, numberOfIncreases]) => {
          expect(depthIncreaseCount(depths)).toBe(numberOfIncreases);
        }
      )
    );
  });
});
