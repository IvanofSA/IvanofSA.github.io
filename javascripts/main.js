(function(){
  var accordion = document.getElementById('accordion'),
      titles = accordion.getElementsByTagName('div');

  for ( var i=0; i<titles.length; i++ ){
    titles[i].addEventListener('click', displayAccordion);
  }

  function displayAccordion() {
    var content = this.nextSibling.nextSibling;
    console.log(this)

    if ( !content.classList.contains('active') ) {
      content.classList.add('active')
      this.classList.add('color')
    } else {
      content.classList.remove('active')
      this.classList.remove('color')
    }
  }
})();
