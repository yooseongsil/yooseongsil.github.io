const $clock = document.querySelector(".clock");

function addZeroToTime(value) {
  return value < 10 ? `0${value}` : value;
}

function clock() {
  const today = new Date();
  const hour = today.getHours();
  const minute = today.getMinutes();
  $clock.innerText = `${addZeroToTime(hour)}:${addZeroToTime(minute)}`
}

export { clock };