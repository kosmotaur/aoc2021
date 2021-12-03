import depthIncreaseCount, { Depths } from './countIncreasingDepths';
import fc, { Arbitrary } from 'fast-check';
import Chance from 'chance';
import { expect } from '@jest/globals';

const chance = Chance();

const withNIncreasing: (
  n: number,
  windowWidth?: number
) => Arbitrary<Depths> = (n, windowWidth = 1) =>
  fc.array(fc.nat(), { minLength: n + windowWidth }).map((depths) => {
    const sortedDecreasingDepths = depths.sort((a, b) => b - a);
    const indicesBeforeIncreaseOfDepth = chance
      .unique(
        () =>
          chance.natural({
            min: windowWidth - 1,
            max: sortedDecreasingDepths.length - windowWidth - 1
          }),
        n
      )
      .sort((a, b) => a - b);

    return indicesBeforeIncreaseOfDepth.reduce((acc, index) => {
      acc[index + windowWidth] =
        acc
          .slice(index, index + windowWidth)
          .reduce((sum, depth) => sum + depth, 0) + chance.natural({ min: 1 });

      return acc;
    }, sortedDecreasingDepths);
  });

describe('01-1', () => {
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

describe('01-2', () => {
  const windowWidth = 3;

  it('has no increases for depths count less or equal to sliding window width', () => {
    fc.assert(
      fc.property(
        fc
          .array(fc.nat(), { minLength: 0, maxLength: windowWidth })
          .map((depths) => depths.sort((a, b) => a - b)),
        (depths) => {
          expect(depthIncreaseCount(depths, windowWidth)).toBe(0);
        }
      )
    );
  });
});
