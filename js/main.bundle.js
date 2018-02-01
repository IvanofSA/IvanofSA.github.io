var file = document.getElementById('img');
var submit = document.getElementById('submit');
var baseImg = '';

submit.addEventListener('click', sendAjaxRequest);
file.addEventListener('change', previewFile);

function previewFile() {
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  reader.onloadend = function () {
    baseImg = reader.result;
    var image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    };
    image.src = baseImg;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}


function sendAjaxRequest(e) {
  e.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/url/url/url', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(baseImg);
}
