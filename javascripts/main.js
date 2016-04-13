new Promise(function(resolve) {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
})
    .then(function() {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: 5377462
            });
            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    })
    .then(function() {

    return new Promise(function(resolve, reject) {
        VK.api('friends.get', {'fields':"photo"}, function(response) {
          // console.log(response);

            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                var source = playerItemTemplate.innerHTML,
                    templateFn = Handlebars.compile(source),
                    template = templateFn({list: response.response});
                    // console.log(response.response);
                friendAll.innerHTML = template;
                // console.log(response.response);
            }

            function handleDragStart(e) {
              var id = "transferElem";
              e.target.closest("li").setAttribute("id", id);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData('text', id);
            };

            function handleDragOver(e) {
              if (e.preventDefault) {
              e.preventDefault();
              }
            };

            function handleDragEnd(e) {
              e.target.closest("li").removeAttribute("id");
              var changePlus = e.target.querySelector('[data-role=plus]');

              if (changePlus.getAttribute('data-role') === 'plus') {
              changePlus.setAttribute('data-role', 'minus');
              e.target.closest("li").setAttribute('draggable', 'false');

              }

            };

            function handleDrop(e) {
              if (e.stopPropagation) {
                e.stopPropagation();
              }

              e.preventDefault();
              var dataId = e.dataTransfer.getData("text");

              friendSave.appendChild(document.getElementById(dataId));
            };

            friendAll.addEventListener('dragstart', handleDragStart);

            friendSave.addEventListener('drop', handleDrop);
            friendSave.addEventListener('dragover', handleDragOver);
            friendSave.addEventListener('dragend', handleDragEnd);
            friendWrap.addEventListener('click', transferFriend);

            function transferFriend(e) {
              var elemRemove = e.target.closest("li");
              var firstChild = friendList.firstChild.nextElementSibling;
              var btn = friendList.querySelector('.glyphicon');
              // console.log( e.target.classList.contains("glyphicon"));
              if ( e.target.classList.contains("glyphicon")) {
                if (e.target.getAttribute('data-role') === 'plus') {
                  elemRemove.setAttribute('draggable', 'false');
                  e.target.setAttribute('data-role', 'minus');
                  friendSave.appendChild(elemRemove);

                } else if(e.target.getAttribute('data-role') === 'minus') {
                    elemRemove.setAttribute('draggable', 'true');
                    e.target.setAttribute('data-role', 'plus');
                    friendList.insertBefore(elemRemove, firstChild);
                }
              }
            }

            searchAll.addEventListener('input', addList);
            searchSave.addEventListener('input', addListSave);

            	function addList(e) {

                var friendAllLi = friendList.querySelectorAll('.friendItem');
                console.log(this);
                friendFilterAll.call(this, friendAllLi);
              }

              function addListSave(e) {

                var friendAllLi = friendSave.querySelectorAll('.friendItem');
                console.log(this);
                friendFilterAll.call(this, friendAllLi);
              }

              function friendFilterAll(friendAllLi) {
                console.log(this);
                var friendArrObj = [].map.call(friendAllLi, function(el) {

                    var newObj = {};
                    newObj.id = el.getAttribute("data-id");
                    newObj.name = el.innerText;
                    newObj.list = el;

                    return newObj;
                  });

                var friendfilterArr = friendArrObj.filter(filterFn, this);
                // console.log(friendArrObj);
                for (var k= 0; k < friendAllLi.length; k++) {
                  friendAllLi[k].classList.remove('hide');
                }
                for (var j = 0; j < friendfilterArr.length; j++) {
                  friendfilterArr[j].list.classList.add('hide');
                }
              }


              function filterFn(el, ind, ar, thisArg) {
              	var inpValue  = this.value;
                console.log(this.value);
              	if (inpValue === '') {
              		return false;
              	}
              	return (el.name.toLowerCase().indexOf(inpValue.trim().toLowerCase()) === -1)
              }

            saveButton.addEventListener('click', saveLocalS);
            removeButton.addEventListener('click', removeLocalS);

              function removeLocalS() {
                localStorage.removeItem('list');
                friendSave.innerHTML = '';
              }

              function saveLocalS() {
                var saveList = friendSave.querySelectorAll('.friendItem');
                // console.log(saveList);
                var friendArrObj = [].map.call(saveList, function(el) {
                var minus = friendSave.querySelector('.glyphicon');
                var photo = el.querySelector('.avatar');
                var name = el.innerText.split(' ');
                // console.log(name);
                    var newObj = {};
                    newObj.uid = el.getAttribute("data-id");
                    newObj.photo = photo.getAttribute('src');
                    newObj.minus = minus.getAttribute('data-role');
                    newObj.first_name = name[1];
                    newObj.last_name = name[2];
                    console.log(newObj);
                    return newObj;
                  });

                var friendHtml = JSON.stringify(friendArrObj);

                localStorage.setItem('list', friendHtml)
              }

              var JSonParse = JSON.parse(localStorage.getItem('list'));

              var source = playerItemTemplate2.innerHTML,
                  templateFn = Handlebars.compile(source),
                  template = templateFn({list: JSonParse});
                  // console.log(response.response);
              friendSave.innerHTML = template;

        });

    });
}).catch(function(e) {
    alert('Ошибка: ' + e.message);
});
