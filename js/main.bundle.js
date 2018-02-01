var file = document.getElementById('img');

file.addEventListener('change', previewFile);

function previewFile() {
  var file = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var centerX = canvas.offsetWidth / 2;
  var centerY = canvas.offsetHeight / 2;

  reader.onloadend = function () {
    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
    image.src = reader.result;

  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

