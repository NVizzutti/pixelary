let image = new Image();
image.src = 'images/dog.jpg';
image.onload = function() {
  start(image);
};
function start(img) {
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
  };
  let timer = setInterval(changeImage, 10);
  // setTimeout(() => (clearInterval(timer)), 500000);
}
