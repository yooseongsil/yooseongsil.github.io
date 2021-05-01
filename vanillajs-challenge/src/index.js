import { clock } from './clock.js';

function init() {
  clock();
  setInterval(clock, 1000);
}

init();
