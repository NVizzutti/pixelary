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

$('.modal-btn').click(() => {
  $('#modal').css({"display":"block"});
});

$('#close-modal').click(() => {
  $('#modal').css({"display": "none"});
});

$('body').click(function(e){
       if (e.target.id == "modal" || e.target.id == "open-modal"){
         return;
       }
       else if ($(e.target).closest('#modal').length){
         return;
       }
       else if ($("#modal").css("display") === "block"){
         $('#modal').css({"display": "none"});
       }
});

});

function displayMessage() {
  $('#message').text('Correct!').fadeTo('slow',1);
  $('#sub-message').text('Press Any Key to Continue').fadeTo('slow', 1);
  $('#description').html(currentDescription).fadeTo('slow', 1);
}

export const clearMessage = function() {
  $('#sub-message').fadeTo('slow', 0);
  $('#message').fadeTo('slow', 0);
  $('#description').fadeTo('slow', 0);
};

export const Descriptions = {};
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
