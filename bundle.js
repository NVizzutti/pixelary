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
	__webpack_require__(4);
	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkGuess = exports.running = undefined;
	
	var _timer = __webpack_require__(2);
	
	var _filters = __webpack_require__(3);
	
	var Filters = _interopRequireWildcard(_filters);
	
	var _input = __webpack_require__(4);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var running = exports.running = false;
	var image = void 0;
	var imageFile = void 0;
	var selectedImage = void 0;
	var answerString = void 0;
	selectImage();
	
	function selectImage() {
	  image = new Image();
	  imageFile = ['dog.jpg', 'vader.png'];
	  selectedImage = imageFile[Math.floor(Math.random() * imageFile.length)];
	  answerString = selectedImage.split('.')[0];
	  image.src = 'images/' + selectedImage;
	}
	
	function selectRandomFilter() {
	  var objKeys = Object.keys(Filters);
	  var selectedKey = objKeys[Math.floor(Math.random() * objKeys.length)];
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
	    var randomBlue = Math.random() * 255;
	    for (var i = 0; i < currentData.length; i += 4) {
	      currentData[i] = Math.floor(Math.random() * randomBlue);
	      currentData[i + 1] = Math.floor(Math.random() * 100);
	      currentData[i + 2] = Math.floor(Math.random() * 255);
	      currentData[i + 3] = 255;
	    }
	  };
	
	  resetImage();
	
	  var changeImage = function changeImage(filter) {
	    filter(currentData, originalData);
	    ctx.putImageData(imageData, 0, 0);
	    var timeLeft = $('#clock').text().replace(':', '');
	    if (parseInt(timeLeft) > 0 && running) {
	      setTimeout(function () {
	        return changeImage(filter);
	      }, 100);
	    }
	  };
	  changeImage(Filters.divideRows);
	}
	
	var checkGuess = exports.checkGuess = function checkGuess(guess) {
	  console.log(guess, answerString);
	  console.log(guess.includes(answerString));
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
	  var newString = minutesStr + ':' + secondsStr;
	  $('#clock').text(newString);
	  if ((minutes > 0 || seconds > 0) && _image.running) {
	    setTimeout(tickClock, 1000);
	  } else if (minutes <= 0 && seconds <= 0) {
	    alert('time up');
	  }
	};
	
	var resetTimer = exports.resetTimer = function resetTimer() {
	  $('#clock').text('1:00');
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	  var lastPixelBlack = true;
	  var limit = Math.floor(Math.random() * 255);
	  for (var i = 0; i < original.length; i += 4) {
	    var red = original[i];
	    var green = original[i + 1];
	    var blue = original[i + 2];
	    current[i + 3] = 255;
	    var extreme = 0.25 * red + 0.75 * green + 0.07 * blue > limit ? 255 : 0;
	    if (extreme === 255 && !lastPixelBlack) {
	      lastPixelBlack = true;
	      current[i]++;
	      current[i + 1]++;
	      current[i + 2]++;
	    } else if (extreme === 0) {
	      lastPixelBlack = false;
	      current[i] -= 1;
	    }
	  }
	};
	
	var thresholdEasy = exports.thresholdEasy = function thresholdEasy(current, original) {
	  for (var i = 0; i < original.length; i += 4) {
	    var randIdx = Math.ceil(Math.random() * (original.length / 4) * 4) + 1;
	    var red = original[randIdx];
	    var green = original[randIdx + 1];
	    var blue = original[randIdx + 2];
	    var extreme = 0.25 * red + 0.75 * green + 0.07 * blue > 200 ? 255 : 0;
	    if (extreme === 255) {
	      current[randIdx]++;
	      current[randIdx + 1]++;
	      current[randIdx + 2]++;
	    } else if (extreme === 0) {}
	  }
	};
	
	var randomPixels = exports.randomPixels = function randomPixels(current, original) {
	  for (var i = 0; i < original.length / (original.length * 0.008); i += 4) {
	    var randIdx = Math.floor(Math.random() * original.length);
	    current[randIdx] = original[randIdx];
	  }
	};
	
	var divideRows = exports.divideRows = function divideRows(current, original) {
	  for (var i = 0; i < original.length / 4; i += 4) {}
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.clearMessage = undefined;
	
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
	  $('#message').text('Correct!');
	}
	
	var clearMessage = exports.clearMessage = function clearMessage() {
	  $('#message').text('');
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map