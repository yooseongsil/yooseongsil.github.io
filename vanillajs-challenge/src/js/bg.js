const IMAGE_MAX_NUMBER = 5;

function paintImage(element, imageNumber) {
  const image = new Image();
  image.src = `src/images/${imageNumber + 1}.jpg`;
  image.classList.add("bg-image");
  element.appendChild(image);
}

export { IMAGE_MAX_NUMBER, paintImage };