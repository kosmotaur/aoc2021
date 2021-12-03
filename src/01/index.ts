import { readFileSync } from 'fs';
import countIncreasingDepths from './countIncreasingDepths';

const run = () => {
  const puzzleInput = readFileSync(`${__dirname}/input.txt`)
    .toString()
    .split('\n')
    .map(Number);
  const count = countIncreasingDepths(puzzleInput);

  console.log({ count });
};

run();
