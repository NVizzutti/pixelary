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
  $('#message').text('Correct!');
}

export const clearMessage = function() {
  $('#message').text('');
};
