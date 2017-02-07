import isPrime from 'is-prime';

export const fade = function(current, original) {
  for (let i = 0; i < current.length; i ++) {
    if (current[i] < original[i]) {
      current[i] += 1;
    } else if (current[i] > original[i]) {
      current[i] -= 1;
    }
  }
};

export const threshold = function(current, original) {
  let limit = Math.floor(Math.random() * 255);
  for (let i = 0; i < original.length; i+=4) {
    let red = original[i];
    let green = original[i+1];
    let blue = original[i+2];
    current[i + 3] = 255;
    let extreme = (0.25 * red + 0.75 * green + 0.07 * blue > limit) ? 255 : 0;
    if (extreme === 255) {
      current[i]++;
      current[i+1]++;
      current[i+2]++;
    } else if (extreme === 0) {
      current[i + 3] = 0;
    }
  }
};

export const thresholdEasy = function(current, original) {
  for (let i = 0; i < original.length; i+=4) {
    let randIdx = getRandomIndex(original);
    let red = original[randIdx];
    let green = original[randIdx+1];
    let blue = original[randIdx+2];
    let extreme = (0.25 * red + 0.75 * green + 0.07 * blue > 115) ? 255 : 0;
    if (extreme === 255) {
      current[randIdx]++;
      current[randIdx+1]++;
      current[randIdx+2]++;
    } else {
      current[randIdx]--;
      current[randIdx + 1]--;
      current[randIdx + 2]--;
    }
  }
};

export const randomPixels = function(current, original) {
  for (let i = 0; i < (original.length / (original.length * 0.002)); i+=4) {
    let randIdx = getRandomIndex(original);
    current[randIdx] = original[randIdx];
    current[randIdx + 1] = original[randIdx + 1];
    current[randIdx + 2] = original[randIdx + 2];
  }
};

export const grayScale = function(current, original) {
  let gray;
  for (let i = 0; i < original.length; i+=4) {
    gray = (0.3 * original[i]) +
    (0.6 * original[i + 1]) + (0.11 * original[i + 2]);
    original[i] = gray;
    original[i + 1] = gray;
    original[i + 2] = gray;
  }
  for (let i = 0; i < original.length / (original.length * 0.002); i++) {
    let randIdx = getRandomIndex(original);
    current[randIdx] = original[randIdx];
    current[randIdx + 1] = original[randIdx + 1];
    current[randIdx + 2] = original[randIdx + 2];
  }
};

export const invert = function(current, original) {
  for (let i = 0; i < original.length; i+= 4) {
    let randIdx = getRandomIndex(original);
    let red = 255 - original[i];
    let green = 255 - original[i + 1];
    let blue = 255 - original[i + 2];
    original[i] < red ? current[i]++ : current[i]--;
    original[i + 1] < green ? current[i + 1]++ : current[i + 2]--;
    original[i + 2] < blue ? current[i + 2]++ : current[i + 2]--;
  }
};

export const sepiaTone = function(current, original) {
  for (let i = 0; i < original.length; i+= 4) {
    let gray = (0.3 * original[i]) + (0.6 * original[i + 1]) +
    (0.11 * original[i + 2]);
    let black = original[i] + original[i + 1] + original[i + 2];
    if (black > 50) {
      current[i] < (gray + 150) ? current[i]++ : current[i]--;
      current[i + 1] < (gray + 50) ? current[i + 1]++ : current[i + 1]--;
      current[i + 2] < (gray) ? current[i + 2]++ : current[i + 2]--;
    }
  }
};

export const inverseThreshold = function(current, original) {
  let inverse = (Math.floor(Math.random() * 90) + 110);
  for (let i = 0; i < original.length; i+=4) {
    current[i] = original[i];
    current[i + 1] = original[i + 1];
    current[i + 2] = original[i + 2];
    current[i + 3] = original[i + 3];
  }
  for (let j = 0; j < original.length; j+= 4) {
    let black = current[j] + current[j + 1] + current[j + 2];
    if (black > inverse) {
      current[j] = original[j];
      current[j + 1] = original[j + 1];
      current[j + 2] = original[j + 2];
      current[j + 3] = original[j + 3] === 0 ? 1 : 1;
    }
  }
};

export const offsetPattern = function(current, original) {
  let idx = 0;
  for (let i = 0; i < 800; i++) {
    for (let j = 0; j < 800; j++) {
      let offsetX = i - 200;
      let offsetY = j - 200;
      let offset = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
      let result = Math.sin(offset/8);
      current[idx] += (original[idx] - (result * original[idx])) * 0.05;
      current[idx+= 1] += (original[idx] - (result * original[idx + 1])) * 0.1;
      current[idx+= 1] += (original[idx] - (result * original[idx + 2])) * 0.1;
      current[idx+= 1] = 200;
    }
  }
};

export const primePixels = function(current, original) {
  for (var i = 1; i < original.length; i++) {
    let randIdx = Math.ceil(Math.random() * original.length);
    if (isPrime(randIdx)) {
      current[randIdx] = original[randIdx];
    }
  }
};


const getRandomIndex = function(arr) {
  return ((Math.floor(Math.random() * (arr.length) / 4)) * 4);
};
