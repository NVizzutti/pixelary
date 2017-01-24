function tickClock() {
  let timeString = $('#clock').text();
  let minutes = timeString.split(':')[0];
  let seconds = timeString.split(':')[1];
  seconds -= 1;
}

$(document).ready(() => {
  tickClock();
});
