import {tickClock, resetTimer} from './timer';
import * as Filters from './filters';
import {clearMessage} from './input';
export let running = false;
let image;
let imageFile;
let selectedImage;
let answerString;
selectImage();

function selectImage() {
   image = new Image();
   imageFile = ['dog.jpg', 'vader.png'];
   selectedImage = imageFile[Math.floor(Math.random() * imageFile.length)];
   answerString = selectedImage.split('.')[0];
   image.src = `images/${selectedImage}`;
}

function selectRandomFilter() {
  let objKeys = Object.keys(Filters);
  let selectedKey = objKeys[Math.floor(Math.random() * objKeys.length)];
  return Filters[selectedKey];
}

$(document).keypress(() => {
    if (!running) {
      clearMessage();
      resetTimer();
      start(image);
      tickClock();
    }
});

function start(img) {
  running = true;
  let hiddenCanvas = document.createElement('canvas');
  let hiddenCtx = hiddenCanvas.getContext('2d');
  hiddenCanvas.height = img.height;
  hiddenCanvas.width = img.width;
  hiddenCtx.drawImage(img, 0, 0);
  let imageData = hiddenCtx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
  let canvas = document.getElementById('img-canvas');
  let ctx = canvas.getContext('2d');
  canvas.height = img.height;
  canvas.width = img.width;
  let currentData = imageData.data;
  let originalData = currentData.map(el => el);
  let currentFilter = selectRandomFilter();

  let resetImage = function() {
    let randomBlue = Math.random() * 255;
    for (var i = 0; i < currentData.length; i+=4) {
      currentData[i] = Math.floor(Math.random() * (randomBlue));
      currentData[i+1] = Math.floor(Math.random() * 100);
      currentData[i+2] = Math.floor(Math.random() * 255);
      currentData[i+3] = 255;
    }
  };

  resetImage();

  let changeImage = function(filter) {
    filter(currentData, originalData);
    ctx.putImageData(imageData, 0, 0);
    let timeLeft = ($('#clock').text()).replace(':', '');
    if ((parseInt(timeLeft) > 0) && running) {
      setTimeout(() => changeImage(filter), 100);
    }
  };
  changeImage(Filters.divideRows);
}

export const checkGuess = function(guess) {
  console.log(guess, answerString);
  console.log(guess.includes(answerString));
  if (guess.includes(answerString)) {
    running = false;
    selectImage();
    resetTimer();
    return true;
  }
  return false;
};
