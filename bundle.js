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

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	$(document).ready(() => {
	
	  $(document).keypress((e) => {
	    handleKeyPress(e.keyCode);
	  });
	
	  $('#guess').change(() => {
	    let value = $('#guess').val();
	    console.log(value);
	  });
	
	  function handleKeyPress(code) {
	    if (code === 13) {
	
	    }
	  }
	  
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	function tickClock() {
	  let timeString = $('#clock').text();
	  let minutes = timeString.split(':')[0];
	  let seconds = timeString.split(':')[1];
	  seconds -= 1;
	}
	
	$(document).ready(() => {
	  tickClock();
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map