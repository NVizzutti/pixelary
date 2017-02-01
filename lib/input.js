import {checkGuess, currentDescription} from './image';

$(document).ready(() => {

  $('#guess').change(() => {
    let value = $('#guess').val();
    let won = checkGuess(value);
    $('#guess').val('');
    if (won) {
      displayMessage();
    }
  });

  $("#zoom").hover(
  function () {
    $('canvas').addClass("zoomed");
  },
  function () {
    $('canvas').removeClass("zoomed");
  }
);
});

function displayMessage() {
  $('#message').text('Correct!').fadeTo('slow',1);
  $('#sub-message').text('Press Any Key to Continue').fadeTo('slow', 1);
  $('#description').text(currentDescription).fadeTo('slow', 1);
}

export const clearMessage = function() {
  $('#sub-message').fadeTo('slow', 0);
  $('#message').fadeTo('slow', 0);
  $('#description').fadeTo('slow', 0);
};

export const Descriptions = {};
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
Look at all that green! That's because in HTML5 green corresponds to 1, 5, 9, 13, 17 etc. in memory.";
Descriptions.inverseThreshold = "I just made this one for fun. It detects pixel luminosity at changing \
threshold and fills in the inverse, leaving the remaining pixels black or transparent.";
