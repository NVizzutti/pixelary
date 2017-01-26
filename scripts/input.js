import {checkGuess} from './image';
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
  // $('#message').text('Correct!');
  // $('#sub-message').text('Press Enter to Continue');
  $('#message').text('Correct!').fadeTo('slow',1);
  $('#sub-message').text('Press Any Key to Continue').fadeTo('slow', 1);
}

export const clearMessage = function() {
  $('#sub-message').fadeTo('slow', 0);
  $('#message').fadeTo('slow', 0);
};
