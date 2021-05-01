import { getRandomNumber } from './constants.js';
import { clock } from './clock.js';
import { IMAGE_MAX_NUMBER, paintImage } from './bg.js';

const $body = document.querySelector("body");

function init() {
  clock();
  setInterval(clock, 1000);

  const randomNumber = getRandomNumber(IMAGE_MAX_NUMBER);
  paintImage($body, randomNumber);
}

init();
