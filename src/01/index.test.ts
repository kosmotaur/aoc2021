import depthIncreaseCount from './index';
import fc from 'fast-check';

describe('01', () => {
  it('has no increases for no depths', () => {
    fc.assert(
      fc.property(fc.array<number>(fc.nat(), { maxLength: 0 }), (depths) => {
        expect(depthIncreaseCount(depths)).toBe(0);
      })
    );
  });
});
