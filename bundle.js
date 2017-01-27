/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	__webpack_require__(8);
	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkGuess = exports.answerString = exports.currentDescription = exports.running = undefined;
	
	var _timer = __webpack_require__(2);
	
	var _filters = __webpack_require__(3);
	
	var Filters = _interopRequireWildcard(_filters);
	
	var _input = __webpack_require__(8);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var running = exports.running = false;
	var image = void 0;
	var stage = 0;
	var selectedImage = void 0;
	var currentDescription = exports.currentDescription = void 0;
	var imageFile = ['flower.jpeg', 'strawberry.jpeg', 'eagle.jpeg', 'cat.jpeg', 'microphone.jpeg', 'grass.jpeg', 'glasses.jpg', 'horse.jpeg', 'tennis.jpeg'];
	var answerString = exports.answerString = void 0;
	
	selectImage();
	
	function selectImage() {
	  image = new Image();
	  selectedImage = imageFile[stage];
	  stage++;
	  stage = stage >= imageFile.length ? 0 : stage;
	  exports.answerString = answerString = selectedImage.split('.')[0];
	  image.src = 'images/' + selectedImage;
	}
	
	function selectRandomFilter() {
	  var objKeys = Object.keys(Filters);
	  var selectedKey = objKeys[Math.floor(Math.random() * objKeys.length)];
	  exports.currentDescription = currentDescription = _input.Descriptions[selectedKey];
	  return Filters[selectedKey];
	}
	
	$(document).keypress(function () {
	  if (!running) {
	    (0, _input.clearMessage)();
	    (0, _timer.resetTimer)();
	    start(image);
	    (0, _timer.tickClock)();
	  }
	});
	
	function start(img) {
	  exports.running = running = true;
	  var hiddenCanvas = document.createElement('canvas');
	  var hiddenCtx = hiddenCanvas.getContext('2d');
	  hiddenCanvas.height = img.height;
	  hiddenCanvas.width = img.width;
	  hiddenCtx.drawImage(img, 0, 0);
	  var imageData = hiddenCtx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
	  var canvas = document.getElementById('img-canvas');
	  var ctx = canvas.getContext('2d');
	  canvas.height = img.height;
	  canvas.width = img.width;
	  var currentData = imageData.data;
	  var originalData = currentData.map(function (el) {
	    return el;
	  });
	  var currentFilter = selectRandomFilter();
	
	  var resetImage = function resetImage() {
	    for (var i = 0; i < currentData.length; i += 4) {
	      currentData[i] = 0;
	      currentData[i + 1] = 0;
	      currentData[i + 2] = 0;
	      currentData[i + 3] = 255;
	    }
	  };
	
	  var changeImage = function changeImage(filter) {
	    filter(currentData, originalData);
	    ctx.scale(2, 2);
	    ctx.putImageData(imageData, 0, 0);
	    var timeLeft = $('#clock').text().replace(':', '');
	    if (parseInt(timeLeft) > 0 && running) {
	      setTimeout(function () {
	        return changeImage(filter);
	      }, 100);
	    }
	  };
	  resetImage();
	  changeImage(Filters.sepiaTone);
	}
	
	var checkGuess = exports.checkGuess = function checkGuess(guess) {
	  guess = guess.toLowerCase();
	  if (guess.includes(answerString)) {
	    exports.running = running = false;
	    selectImage();
	    (0, _timer.resetTimer)();
	    return true;
	  }
	  return false;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.resetTimer = exports.tickClock = undefined;
	
	var _image = __webpack_require__(1);
	
	var timeString = void 0;
	
	var tickClock = exports.tickClock = function tickClock() {
	  timeString = $('#clock').text();
	  var minutes = parseInt(timeString.split(':')[0]);
	  var seconds = parseInt(timeString.split(':')[1]);
	  seconds -= 1;
	  if (seconds < 0) {
	    seconds = 59;
	    minutes -= 1;
	  }
	
	  var minutesStr = minutes.toString();
	  var secondsStr = seconds.toString();
	  var zero = seconds < 10 ? '0' : '';
	  var newString = minutesStr + ':' + zero + secondsStr;
	  $('#clock').text(newString);
	  if ((minutes > 0 || seconds > 0) && _image.running) {
	    setTimeout(tickClock, 1000);
	  } else if (minutes <= 0 && seconds <= 0) {
	    $('#messages').text('Answer was ' + _image.answerString);
	  }
	};
	
	var resetTimer = exports.resetTimer = function resetTimer() {
	  $('#clock').text('1:00');
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.primePixels = exports.offsetPattern = exports.sepiaTone = exports.invert = exports.grayScale = exports.randomPixels = exports.thresholdEasy = exports.threshold = exports.fade = undefined;
	
	var _isPrime = __webpack_require__(4);
	
	var _isPrime2 = _interopRequireDefault(_isPrime);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var fade = exports.fade = function fade(current, original) {
	  for (var i = 0; i < current.length; i++) {
	    if (current[i] < original[i]) {
	      current[i] += 1;
	    } else if (current[i] > original[i]) {
	      current[i] -= 1;
	    }
	  }
	};
	
	var threshold = exports.threshold = function threshold(current, original) {
	  var limit = Math.floor(Math.random() * 255);
	  for (var i = 0; i < original.length; i += 4) {
	    var red = original[i];
	    var green = original[i + 1];
	    var blue = original[i + 2];
	    current[i + 3] = 255;
	    var extreme = 0.25 * red + 0.75 * green + 0.07 * blue > limit ? 255 : 0;
	    if (extreme === 255) {
	      current[i]++;
	      current[i + 1]++;
	      current[i + 2]++;
	    } else if (extreme === 0) {
	      current[i + 3] = 0;
	    }
	  }
	};
	
	var thresholdEasy = exports.thresholdEasy = function thresholdEasy(current, original) {
	  for (var i = 0; i < original.length; i += 4) {
	    var randIdx = getRandomIndex(original);
	    var red = original[randIdx];
	    var green = original[randIdx + 1];
	    var blue = original[randIdx + 2];
	    var extreme = 0.25 * red + 0.75 * green + 0.07 * blue > 115 ? 255 : 0;
	    if (extreme === 255) {
	      current[randIdx]++;
	      current[randIdx + 1]++;
	      current[randIdx + 2]++;
	    } else {
	      current[randIdx]--;
	      current[randIdx + 1]--;
	      current[randIdx + 2]--;
	    }
	  }
	};
	
	var randomPixels = exports.randomPixels = function randomPixels(current, original) {
	  for (var i = 0; i < original.length / (original.length * 0.002); i += 4) {
	    var randIdx = getRandomIndex(original);
	    current[randIdx] = original[randIdx];
	    current[randIdx + 1] = original[randIdx + 1];
	    current[randIdx + 2] = original[randIdx + 2];
	  }
	};
	
	var grayScale = exports.grayScale = function grayScale(current, original) {
	  var gray = void 0;
	  for (var i = 0; i < original.length; i += 4) {
	    gray = 0.3 * original[i] + 0.6 * original[i + 1] + 0.11 * original[i + 2];
	    original[i] = gray;
	    original[i + 1] = gray;
	    original[i + 2] = gray;
	  }
	  for (var _i = 0; _i < original.length / (original.length * 0.002); _i++) {
	    var randIdx = getRandomIndex(original);
	    current[randIdx] = original[randIdx];
	    current[randIdx + 1] = original[randIdx + 1];
	    current[randIdx + 2] = original[randIdx + 2];
	  }
	};
	
	var invert = exports.invert = function invert(current, original) {
	  for (var i = 0; i < original.length; i += 4) {
	    var randIdx = getRandomIndex(original);
	    var red = 255 - original[i];
	    var green = 255 - original[i + 1];
	    var blue = 255 - original[i + 2];
	    original[i] < red ? current[i]++ : current[i]--;
	    original[i + 1] < green ? current[i + 1]++ : current[i + 2]--;
	    original[i + 2] < blue ? current[i + 2]++ : current[i + 2]--;
	  }
	};
	
	var sepiaTone = exports.sepiaTone = function sepiaTone(current, original) {
	  for (var i = 0; i < original.length; i += 4) {
	    var randIdx = getRandomIndex(original);
	    var gray = 0.3 * original[randIdx] + 0.6 * original[randIdx + 1] + 0.11 * original[randIdx + 2];
	    current[randIdx] < original[randIdx] + 125 ? current[randIdx]++ : current[randIdx]--;
	    current[randIdx + 1] < original[randIdx + 1] + 50 ? current[randIdx + 1]++ : current[randIdx + 1]--;
	    current[randIdx + 2] < original[randIdx + 2] ? current[randIdx + 2]++ : current[randIdx + 2]--;
	  }
	};
	
	var offsetPattern = exports.offsetPattern = function offsetPattern(current, original) {
	  var idx = 0;
	  for (var i = 0; i < 800; i++) {
	    for (var j = 0; j < 800; j++) {
	      var offsetX = i - 200;
	      var offsetY = j - 200;
	      var offset = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
	      var result = Math.sin(offset / 8);
	      current[idx] += (original[idx] - result * original[idx]) * 0.05;
	      current[idx += 1] += (original[idx] - result * original[idx + 1]) * 0.1;
	      current[idx += 1] += (original[idx] - result * original[idx + 2]) * 0.1;
	      current[idx += 1] = 200;
	    }
	  }
	};
	
	var primePixels = exports.primePixels = function primePixels(current, original) {
	  for (var i = 1; i < original.length; i++) {
	    var randIdx = Math.ceil(Math.random() * original.length);
	    if ((0, _isPrime2.default)(randIdx)) {
	      current[randIdx] = original[randIdx];
	    }
	  }
	};
	
	var getRandomIndex = function getRandomIndex(arr) {
	  return Math.floor(Math.random() * arr.length / 4) * 4;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var numberIsInteger = __webpack_require__(5);
	
	function isPrime (n) {
	  if(n === 1) {
	    return false
	  }
	  if (n === 2 || n === 3) {
	    return true;
	  }
	  else if ( (n % 2 === 0) || (n % 3 === 0) ){
	    return false;
	  }
	  else {
	    var p=5;
	    var w=2;
	    while ( p * p <= n ){
	      if (n % p === 0) { return false; }
	      p += w;
	      w = 6 - w;
	    }
	    return true;
	  }
	}
	
	module.exports = function (n) {
	  if (typeof n !== 'number') {
	    throw new TypeError('Expected a number');
	  }
	  if(n<=0) {
	    throw new Error('The number must be a positive integer');
	  }
	  if(!numberIsInteger(n)){
	    throw new Error('The number must be a integer');
	  }
	  return isPrime(n);
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var numberIsFinite = __webpack_require__(6);
	
	module.exports = Number.isInteger || function (x) {
		return numberIsFinite(x) && Math.floor(x) === x;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var numberIsNan = __webpack_require__(7);
	
	module.exports = Number.isFinite || function (val) {
		return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	module.exports = Number.isNaN || function (x) {
		return x !== x;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Descriptions = exports.clearMessage = undefined;
	
	var _image = __webpack_require__(1);
	
	$(document).ready(function () {
	
	  $('#guess').change(function () {
	    var value = $('#guess').val();
	    var won = (0, _image.checkGuess)(value);
	    $('#guess').val('');
	    if (won) {
	      displayMessage();
	    }
	  });
	});
	
	function displayMessage() {
	  $('#message').text('Correct!').fadeTo('slow', 1);
	  $('#sub-message').text('Press Any Key to Continue').fadeTo('slow', 1);
	  $('#description').text(_image.currentDescription).fadeTo('slow', 1);
	}
	
	var clearMessage = exports.clearMessage = function clearMessage() {
	  $('#sub-message').fadeTo('slow', 0);
	  $('#message').fadeTo('slow', 0);
	  $('#description').fadeTo('slow', 0);
	};
	
	var Descriptions = exports.Descriptions = {};
	Descriptions.offsetPattern = "Adjusting pixel luminosity based on distance from \
	a point on the canvas gives you a circular pattern. You can see where the reference \
	points reset.";
	Descriptions.randomPixels = "This pixel randomizer just selects a random pixel \
	and sets it's correct values, revealing the image.";
	Descriptions.grayScale = "Grayscale conversion finds the luminosity of each \
	 pixel, and sets it's RGB channels to match";
	Descriptions.fade = 'This was a simple fade achieved by incrementing and \
	 decrementing pixels';
	Descriptions.thresholdEasy = 'Threshold reassigns RGB values to a maximum or\
	minimum based on their calculated luminosity.';
	Descriptions.threshold = 'The threshold filter with a twist! \
	Watch the threshold value change randomly.';
	Descriptions.invert = "An Inverted image is the result of subtracting each \
	 pixel's RGB values from their maximum";
	Descriptions.sepiaTone = 'The sepia filter converts each pixel to grayscale, \
	then adds a uniform RGB value to it';
	Descriptions.primePixels = "Here's an image with only prime RGB values. \
	Look at all that green! That's because in HTML5 green corresponds to 1, 5, 9, 13 etc. in memory.";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map