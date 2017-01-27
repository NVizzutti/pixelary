import {tickClock, resetTimer} from './timer';
import * as Filters from './filters';
import {clearMessage, Descriptions} from './input';
let image;
let stage = 0;
let selectedImage;
export let currentDescription;
let imageFile = ['flower.jpeg', 'strawberry.jpeg', 'eagle.jpeg',
'cat.jpeg','microphone.jpeg', 'grass.jpeg', 'glasses.jpg', 'horse.jpeg', 'tennis.jpeg'];
export let answerString;

selectImage();

function selectImage() {
   image = new Image();
   selectedImage = imageFile[stage];
   stage = stage >= imageFile.length ? 0 : stage;
   answerString = selectedImage.split('.')[0];
   image.src = `images/${selectedImage}`;
   stage++;
}


function selectRandomFilter() {
  let objKeys = Object.keys(Filters);
  let selectedKey = objKeys[Math.floor(Math.random() * objKeys.length)];
  currentDescription = Descriptions[selectedKey];
  return Filters[selectedKey];
}

$(document).keypress(() => {
    if (!window.running) {
      clearMessage();
      resetTimer();
      start(image);
      tickClock();
    }
});

function start(img) {
  window.running = true;
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
    for (var i = 0; i < currentData.length; i+=4) {
      currentData[i] = 0;
      currentData[i+1] = 0;
      currentData[i+2] = 0;
      currentData[i+3] = 255;
    }
  };

  let changeImage = function(filter) {
    filter(currentData, originalData);
    ctx.scale(2, 2);
    ctx.putImageData(imageData, 0, 0);
    let timeLeft = ($('#clock').text()).replace(':', '');
    if ((parseInt(timeLeft) > 0) && window.window.running) {
      setTimeout(() => changeImage(filter), 100);
    }
  };
  resetImage();
  changeImage(currentFilter);
}


export const checkGuess = function(guess) {
  guess = guess.toLowerCase();
  if (guess.includes(answerString)) {
    window.running = false;
    selectImage();
    resetTimer();
    return true;
  }
  return false;
};

window.selectImage = selectImage;
