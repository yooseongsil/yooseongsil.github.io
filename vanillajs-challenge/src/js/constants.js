function getRandomNumber(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function setLocalStorage(key, value) {
  try {
    return localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return null;
  }
}

function getTimeNow() {
  return new Date().getTime();
}

export { getRandomNumber, getLocalStorage, setLocalStorage, getTimeNow };