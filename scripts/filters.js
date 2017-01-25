export const fade = function(current, original) {
  for (var i = 0; i < current.length; i ++) {
    if (current[i] < original[i]) {
      current[i] += 1;
    } else if (current[i] > original[i]) {
      current[i] -= 1;
    }
  }
};

export const threshold = function(current, original) {
  let lastPixelBlack = true;
  let limit = Math.floor(Math.random() * 255);
  for (var i = 0; i < original.length; i+=4) {
    var red = original[i];
    var green = original[i+1];
    var blue = original[i+2];
    current[i + 3] = 255;
    var extreme = (0.25 * red + 0.75 * green + 0.07 * blue > limit) ? 255 : 0;
    if (extreme === 255 && !lastPixelBlack) {
      lastPixelBlack = true;
      current[i]++;
      current[i+1]++;
      current[i+2]++;
    } else if (extreme === 0) {
      lastPixelBlack = false;
      current[i] -= 1;
    }
  }
};

export const thresholdEasy = function(current, original) {
  for (var i = 0; i < original.length; i+=4) {
    let randIdx = Math.ceil((Math.random() * (original.length / 4)) * 4) + 1;
    var red = original[randIdx];
    var green = original[randIdx+1];
    var blue = original[randIdx+2];
    var extreme = (0.25 * red + 0.75 * green + 0.07 * blue > 200) ? 255 : 0;
    if (extreme === 255) {
      current[randIdx]++;
      current[randIdx+1]++;
      current[randIdx+2]++;
    } else if (extreme === 0) {
    }
  }
};

export const randomPixels = function(current, original) {
  for (var i = 0; i < (original.length / (original.length * 0.008)); i+=4) {
    let randIdx = Math.floor(Math.random() * original.length);
    current[randIdx] = original[randIdx];
  }
};

export const divideRows = function(current, original) {
  for (var i = 0; i < original.length / 4; i+= 4) {

  }
};

// let idx = 0;
// for (var i = 0; i < img.height; i++) {
//   for (var j = 0; j < img.width; j++) {
//     let offsetX = i - (img.width / 4);
//     let offsetY = j - (img.height / 4);
//     let offset = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
//     let result = Math.sin(offset/8);
//     currentData[idx] = result * 255;
//     currentData[idx+= 1] = result * 255;
//     currentData[idx+= 1] = result * 255;
//     currentData[idx+= 1] = 255;
//   }
// }
