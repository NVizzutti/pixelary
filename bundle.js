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
	__webpack_require__(3);
	window.running = false;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkGuess = exports.answerString = exports.currentDescription = undefined;
	
	var _timer = __webpack_require__(2);
	
	var _filters = __webpack_require__(3);
	
	var Filters = _interopRequireWildcard(_filters);
	
	var _input = __webpack_require__(8);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var image = void 0;
	var stage = 0;
	var selectedImage = void 0;
	var currentDescription = exports.currentDescription = void 0;
	var imageFile = ['flower.jpeg', 'strawberry.jpeg', 'eagle.jpeg', 'cat.jpeg', 'microphone.jpeg', 'grass.jpeg', 'glasses.jpg', 'horse.jpeg', 'ball.jpeg'];
	var answerString = exports.answerString = void 0;
	
	selectImage();
	
	function selectImage() {
	  image = new Image();
	  selectedImage = imageFile[stage];
	  stage = stage >= imageFile.length - 1 ? 0 : stage;
	  exports.answerString = answerString = selectedImage.split('.')[0];
	  image.src = 'images/' + selectedImage;
	  stage++;
	}
	
	function selectRandomFilter() {
	  var objKeys = Object.keys(Filters);
	  var selectedKey = objKeys[Math.floor(Math.random() * objKeys.length)];
	  exports.currentDescription = currentDescription = _input.Descriptions[selectedKey];
	  return Filters[selectedKey];
	}
	
	$(document).ready(function () {
	  $('#stop').click(function () {
	    window.running = false;
	    selectImage();
	  });
	
	  $(document).keypress(function () {
	    if (!window.running) {
	      (0, _input.clearMessage)();
	      (0, _timer.resetTimer)();
	      start(image);
	      (0, _timer.tickClock)();
	    }
	  });
	});
	
	function start(img) {
	  window.running = true;
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
	    if (parseInt(timeLeft) > 0 && window.window.running) {
	      setTimeout(function () {
	        return changeImage(filter);
	      }, 500);
	    }
	  };
	  resetImage();
	  changeImage(Filters.offsetPattern);
	}
	
	var checkGuess = exports.checkGuess = function checkGuess(guess) {
	  var fader = void 0;
	  guess = guess.toLowerCase();
	  var hint = answerString[Math.floor(Math.random() * answerString.length)];
	  if (guess.includes(answerString)) {
	    window.running = false;
	    selectImage();
	    (0, _timer.resetTimer)();
	    return true;
	  } else {
	    clearTimeout(fader);
	    $('#message').text('Not quite!').fadeTo('slow', 1);
	    $('#sub-message').text('Hint: there is a \'' + hint + '\' in the word.').fadeTo('slow', 1);
	    fader = setTimeout(_input.clearMessage, 1500);
	  }
	  return false;
	};
	
	window.selectImage = selectImage;

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
	var tickerTimeout = void 0;
	
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
	  if ((minutes > 0 || seconds > 0) && window.running) {
	    tickerTimeout = setTimeout(tickClock, 1000);
	  } else if (minutes <= 0 && seconds <= 0) {
	    $('#message').text('Answer was ' + _image.answerString).fadeTo('slow', 1);
	    $('#sub-message').text('Press Any Key To Continue').fadeTo('slow', 1);
	    window.running = false;
	    window.selectImage();
	  }
	};
	
	var resetTimer = exports.resetTimer = function resetTimer() {
	  clearTimeout(tickerTimeout);
	  $('#clock').text('1:00');
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.primePixels = exports.offsetPattern = exports.inverseThreshold = exports.sepiaTone = exports.invert = exports.grayScale = exports.randomPixels = exports.thresholdEasy = exports.threshold = exports.fade = undefined;
	
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
	    var gray = 0.3 * original[i] + 0.6 * original[i + 1] + 0.11 * original[i + 2];
	    var black = original[i] + original[i + 1] + original[i + 2];
	    if (black > 50) {
	      current[i] < gray + 150 ? current[i]++ : current[i]--;
	      current[i + 1] < gray + 50 ? current[i + 1]++ : current[i + 1]--;
	      current[i + 2] < gray ? current[i + 2]++ : current[i + 2]--;
	    }
	  }
	};
	
	var inverseThreshold = exports.inverseThreshold = function inverseThreshold(current, original) {
	  var inverse = Math.floor(Math.random() * 90) + 110;
	  for (var i = 0; i < original.length; i += 4) {
	    current[i] = original[i];
	    current[i + 1] = original[i + 1];
	    current[i + 2] = original[i + 2];
	    current[i + 3] = original[i + 3];
	  }
	  for (var j = 0; j < original.length; j += 4) {
	    var black = current[j] + current[j + 1] + current[j + 2];
	    if (black > inverse) {
	      current[j] = original[j];
	      current[j + 1] = original[j + 1];
	      current[j + 2] = original[j + 2];
	      current[j + 3] = original[j + 3] === 0 ? 1 : 1;
	    }
	  }
	};
	
	var offsetPattern = exports.offsetPattern = function offsetPattern(current, original) {
	  var idx = 0;
	  for (var i = 0; i < 800; i++) {
	    for (var j = 0; j < 800; j++) {
	      var offsetX = i - 200;
	      var offsetY = j - 200;
	      var offset = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
	      var result = Math.sin(offset / 600);
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
	
	  $("#zoom").hover(function () {
	    $('canvas').addClass("zoomed");
	  }, function () {
	    $('canvas').removeClass("zoomed");
	  });
	
	  $('.modal-btn').click(function () {
	    $('#modal').css({ "display": "block" });
	  });
	
	  $('#close-modal').click(function () {
	    $('#modal').css({ "display": "none" });
	  });
	
	  $('body').click(function (e) {
	    if (e.target.id == "modal" || e.target.id == "open-modal") {
	      return;
	    } else if ($(e.target).closest('#modal').length) {
	      return;
	    } else if ($("#modal").css("display") === "block") {
	      $('#modal').css({ "display": "none" });
	    }
	  });
	});
	
	function displayMessage() {
	  $('#message').text('Correct!').fadeTo('slow', 1);
	  $('#sub-message').text('Press Any Key to Continue').fadeTo('slow', 1);
	  $('#description').html(_image.currentDescription).fadeTo('slow', 1);
	}
	
	var clearMessage = exports.clearMessage = function clearMessage() {
	  $('#sub-message').fadeTo('slow', 0);
	  $('#message').fadeTo('slow', 0);
	  $('#description').fadeTo('slow', 0);
	};
	
	var Descriptions = exports.Descriptions = {};
	Descriptions.offsetPattern = "<u>EFFECT:</u> Offset Pattern | Zoom for closer look";
	Descriptions.randomPixels = "<u>EFFECT:</u> Pixel Randomizer | Mousover Zoom to inspect";
	Descriptions.grayScale = "<u>FILTER:</u> Gray Scale | Take a closer look with Zoom";
	Descriptions.fade = "<u>EFFECT:</u> Fade | Zoom tool to inspect";
	Descriptions.thresholdEasy = '<u>FILTER:</u> Threshold | Zoom for closer look';
	Descriptions.threshold = '<u>EFFECT:</u> Changing Threshold | Zoom tool to inspect';
	Descriptions.invert = "<u>FILTER:</u> Invert | Mouseover Zoom tool to inspect";
	Descriptions.sepiaTone = '<u>FILTER:</u> Sepia Tone | Look closer with Zoom';
	Descriptions.primePixels = "<u>FILTER:</u> Prime Values | Zoom in to inspect";
	Descriptions.inverseThreshold = "<u>FILTER:</u> Reverse Threshold | Enhance view with Zoom";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map