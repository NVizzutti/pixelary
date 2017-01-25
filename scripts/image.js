import {tickClock} from './timer.js';
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

$(document).keypress(() => {
    if (!running) {
      start(image);
      tickClock();
    }
});

function start(img) {
  running = true;
  //Hidden Image Target Data
  let hiddenCanvas = document.createElement('canvas');
  let hiddenCtx = hiddenCanvas.getContext('2d');
  hiddenCanvas.height = img.height;
  hiddenCanvas.width = img.width;
  hiddenCtx.drawImage(img, 0, 0);
  let imageData = hiddenCtx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
  //Image Canvas Starts Solid
  let canvas = document.getElementById('img-canvas');
  let ctx = canvas.getContext('2d');
  canvas.height = img.height;
  canvas.width = img.width;
  let currentData = imageData.data;
  let originalData = currentData.map(el => el);

  let resetImage = function() {
    for (var i = 0; i < currentData.length; i+=4) {
      currentData[i+0]=0;
      currentData[i+1]=0;
      currentData[i+2]=0;
      currentData[i+3]=255;
    }
  };

  resetImage();

  let changeImage = function() {
    for (var i = 0; i < currentData.length; i ++) {
      if (currentData[i] < originalData[i]) {
        currentData[i] += 1;
      } else if (currentData[i] > originalData[i]) {
        currentData[i] -= 1;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    let timeLeft = ($('#clock').text()).replace(':', '');
    if ((parseInt(timeLeft) > 0) && running) {
      setTimeout(changeImage, 100);
    }
  };
  changeImage();
}

export const checkGuess = function(guess) {
  console.log(guess, answerString);
  console.log(guess.includes(answerString));
  if (guess.includes(answerString)) {
    running = false;
    selectImage();
  }
};
