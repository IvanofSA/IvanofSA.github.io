var file = document.getElementById('img');
var submit = document.getElementById('submit');
var baseImg = '';
file.addEventListener('change', previewFile);
var cropper;

function previewFile() {
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();
  var image = document.getElementById('image');

  reader.onloadend = function () {
    baseImg = reader.result;
    image.onload = function () {
      if (image.complete) {
        start.call(image);
      } else {
        image.onload = start;
      }
    };
    image.src = baseImg;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function start() {
  var width = this.offsetWidth;
  var height = this.offsetHeight;
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(
    this,
    0, 0, this.naturalWidth, this.naturalHeight,
    0, 0, width, height
  );
  cropper = new Cropper(canvas);

}

submit.addEventListener('click', function (e) {
  e.preventDefault();
  var cropImg = cropper.getCroppedCanvas().toDataURL('image/jpeg');
  console.log(cropper.getCroppedCanvas().toDataURL('image/jpeg'));

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/url/url/url', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(cropImg);

});

