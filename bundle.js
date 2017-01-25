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
	__webpack_require__(2);
	__webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkGuess = exports.running = undefined;
	
	var _timer = __webpack_require__(3);
	
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
	
	$(document).keypress(function () {
	  if (!running) {
	    start(image);
	    (0, _timer.tickClock)();
	  }
	});
	
	function start(img) {
	  exports.running = running = true;
	  //Hidden Image Target Data
	  var hiddenCanvas = document.createElement('canvas');
	  var hiddenCtx = hiddenCanvas.getContext('2d');
	  hiddenCanvas.height = img.height;
	  hiddenCanvas.width = img.width;
	  hiddenCtx.drawImage(img, 0, 0);
	  var imageData = hiddenCtx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
	  //Image Canvas Starts Solid
	  var canvas = document.getElementById('img-canvas');
	  var ctx = canvas.getContext('2d');
	  canvas.height = img.height;
	  canvas.width = img.width;
	  var currentData = imageData.data;
	  var originalData = currentData.map(function (el) {
	    return el;
	  });
	
	  var resetImage = function resetImage() {
	    for (var i = 0; i < currentData.length; i += 4) {
	      currentData[i + 0] = 0;
	      currentData[i + 1] = 0;
	      currentData[i + 2] = 0;
	      currentData[i + 3] = 255;
	    }
	  };
	
	  resetImage();
	
	  var changeImage = function changeImage() {
	    for (var i = 0; i < currentData.length; i++) {
	      if (currentData[i] < originalData[i]) {
	        currentData[i] += 1;
	      } else if (currentData[i] > originalData[i]) {
	        currentData[i] -= 1;
	      }
	    }
	    ctx.putImageData(imageData, 0, 0);
	    var timeLeft = $('#clock').text().replace(':', '');
	    if (parseInt(timeLeft) > 0 && running) {
	      setTimeout(changeImage, 100);
	    }
	  };
	  changeImage();
	}
	
	var checkGuess = exports.checkGuess = function checkGuess(guess) {
	  console.log(guess, answerString);
	  console.log(guess.includes(answerString));
	  if (guess.includes(answerString)) {
	    exports.running = running = false;
	    selectImage();
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _image = __webpack_require__(1);
	
	$(document).ready(function () {
	
	  $('#guess').change(function () {
	    var value = $('#guess').val();
	    (0, _image.checkGuess)(value);
	    $('#guess').val('');
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tickClock = undefined;
	
	var _image = __webpack_require__(1);
	
	var tickClock = exports.tickClock = function tickClock() {
	  var timeString = $('#clock').text();
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map