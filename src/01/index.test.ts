import depthIncreaseCount from './index';

describe('01', () => {
  it('has no increases for no depths', () => {
    expect(depthIncreaseCount([])).toBe(0);
  });
});
