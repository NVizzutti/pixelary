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
  let lastPixelBlack = true;
  let limit = Math.floor(Math.random() * 255);
  for (let i = 0; i < original.length; i+=4) {
    let red = original[i];
    let green = original[i+1];
    let blue = original[i+2];
    current[i + 3] = 255;
    let extreme = (0.25 * red + 0.75 * green + 0.07 * blue > limit) ? 255 : 0;
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
  for (let i = 0; i < original.length; i+=4) {
    let randIdx = Math.ceil((Math.random() * (original.length / 4)) * 4) + 1;
    let red = original[randIdx];
    let green = original[randIdx+1];
    let blue = original[randIdx+2];
    let extreme = (0.25 * red + 0.75 * green + 0.07 * blue > 200) ? 255 : 0;
    if (extreme === 255) {
      current[randIdx]++;
      current[randIdx+1]++;
      current[randIdx+2]++;
    } else if (extreme === 0) {
    }
  }
};

export const randomPixels = function(current, original) {
  for (let i = 0; i < (original.length / (original.length * 0.002)); i+=4) {
    let randIdx = Math.floor(Math.random() * original.length);
    current[randIdx] = original[randIdx];
    current[randIdx + 1] = original[randIdx + 1];
    current[randIdx + 2] = original[randIdx + 2];
  }
};

export const grayScale = function(current, original) {
  for (let i = 0; i < original.length / (original.length * 0.001); i++) {
    let randIdx = Math.floor(Math.random() * original.length);
    let gray = (0.4 * original[randIdx]) +
    (0.6 * original[randIdx + 1]) + (0.12 * original[randIdx + 2]);
    current[randIdx] = gray;
    // current[randIdx] < gray ? current[randIdx] += 1 : current[randIdx] -= 1;
    // current[randIdx + 1] < gray ? current[randIdx + 1] += 1 : current[randIdx + 1] -= 1;
    // current[randIdx + 2] < gray ? current[randIdx + 2] += 1 : current[randIdx + 2] -= 1;
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
      current[idx] += (current[idx] - (result * original[idx])) * 0.05;
      current[idx+= 1] += (current[idx] - (result * original[idx + 1])) * 0.1;
      current[idx+= 1] += (current[idx] - (result * original[idx + 2])) * 0.1;
      current[idx+= 1] = 200;
    }
    current[i] = original[i];
    current[j] = original[j];
  }
};
