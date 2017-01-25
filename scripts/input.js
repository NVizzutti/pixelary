import {checkGuess} from './image';
$(document).ready(() => {

  $('#guess').change(() => {
    let value = $('#guess').val();
    checkGuess(value);
    $('#guess').val('');
  });

});
