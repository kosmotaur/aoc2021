import depthIncreaseCount from './index';
import fc from 'fast-check';

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
});
