(function(){
 var accordion = document.getElementById('accordion'),
     titles = accordion.getElementsByTagName('h2');

for ( var i=0; i<titles.length; i++ ){
  titles[i].addEventListener('click', displayAccordion);
}

function displayAccordion() {
   content = this.nextSibling.nextSibling;
   console.log(content)

  if ( !content.classList.contains('active') ) {
    content.classList.add('active')
  } else {
    content.classList.remove('active')
  }
}
})();
