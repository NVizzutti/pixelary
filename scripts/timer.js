import {running, answerString} from './image';
let timeString;

export const tickClock = function() {
  timeString = $('#clock').text();
  let minutes = parseInt(timeString.split(':')[0]);
  let seconds = parseInt(timeString.split(':')[1]);
  seconds -= 1;
  if (seconds < 0) {
    seconds = 59;
    minutes -= 1;
  }

  let minutesStr = minutes.toString();
  let secondsStr = seconds.toString();
  let zero = seconds < 10 ? '0' : '';
  let newString = `${minutesStr}:${zero}${secondsStr}`;
  $('#clock').text(newString);
  if ((minutes > 0 || seconds > 0) && running) {
    setTimeout(tickClock, 1000);
  } else if (minutes <= 0 && seconds <= 0) {
    $('#messages').text(`Answer was ${answerString}`);
  }
};

export const resetTimer = function() {
  $('#clock').text('1:00');
};
