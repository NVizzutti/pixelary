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
Descriptions.grayScale = "Grayscale conversion finds the luminosity of each \
 pixel, and sets it's RGB channels to match";
Descriptions.fade = 'This was a simple fade achieved by incrementing and \
 decrementing pixels';
Descriptions.thresholdEasy = 'this is thresholdE';
Descriptions.threshold = 'this is thresdhold';
Descriptions.invert = "An Inverted image is the result of subtracting each \
 pixel's RGB values from their maximum";
Descriptions.sepiaTone = 'The sepia filter converts each pixel to grayscale, \
then adds a uniform RGB value to it';
Descriptions.primePixels = "Here's an image with only prime RGB values. \
Look at all that green! That's because in HTML5 green corresponds to 1, 5, 9, 13 etc. in memory.";
