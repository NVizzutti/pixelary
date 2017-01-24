
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
