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

                friendAll.innerHTML = template;
                // console.log(response.response);
            }

            function handleDragStart(e) {
              e.target.closest("li").setAttribute("id","transferElem");
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData('text', e.target.closest("li").id);
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
              var data = e.dataTransfer.getData("text");
              // console.log(data);

              friendSave.appendChild(document.getElementById(data));
            };

            friendAll.addEventListener('dragstart', handleDragStart, false);

            friendSave.addEventListener('drop', handleDrop, false);
            friendSave.addEventListener('dragover', handleDragOver, false);
            friendSave.addEventListener('dragend', handleDragEnd, false);
            friendWrap.addEventListener('click', transferFriend, false);

            function transferFriend(e) {
              var elemRemove = e.target.closest("li");
              var firstChild = friendList.firstChild.nextElementSibling;
              // console.log(firstChild);
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

            searchAll.addEventListener('input', addList);
            searchSave.addEventListener('input', addListSave);

            	function addList(e) {

                var friendAllLi = friendList.querySelectorAll('.friendItem');

                var friendArrObj = [];

                for (var i = 0; i < friendAllLi.length; i++) {
                  // console.log(arrAll[i]);

                  var newObj = {};
                  newObj.id = friendAllLi[i].getAttribute("data-id");
                  newObj.name = friendAllLi[i].innerText;
                  newObj.list = friendAllLi[i];
                  friendArrObj.push(newObj);
                }
                // console.log(itemArr);
                var friendfilterArr = friendArrObj.filter(filterFn, this);

                friendFilterAll(friendAllLi, friendfilterArr);
              }

              function addListSave(e) {

                var friendAllLi = friendSave.querySelectorAll('.friendItem');
                var friendArrObj = [];

                for (var i = 0; i < friendAllLi.length; i++) {
                  var newObj = {};
                  newObj.id = friendAllLi[i].getAttribute("data-id");
                  newObj.name = friendAllLi[i].innerText;
                  newObj.list = friendAllLi[i];
                  friendArrObj.push(newObj);
                }
                var friendfilterArr = friendArrObj.filter(filterFn, this);
                friendFilterAll(friendAllLi, friendfilterArr);
              }

              function friendFilterAll(arrAll, newArrAll) {
                // console.log(arrAll);
                // console.log(newArrAll);
                for (var k= 0; k < arrAll.length; k++) {
                  arrAll[k].classList.remove('hide');
                }
                for (var j = 0; j < newArrAll.length; j++) {
                  newArrAll[j].list.classList.add('hide');
                }
              }


              function filterFn(el, ind, ar, thisArg) {
              	var inpValue  = this.value;
              	// console.log(this.value);
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

                var friendHtml = friendSave.innerHTML;
                localStorage.setItem('list', friendHtml)
                // console.log(localStorage.getItem('list'));
                // console.log(friendHtml);
              }
              // console.log(localStorage.getItem('list'));
              friendSave.innerHTML = localStorage.getItem('list');

        });

    });
}).catch(function(e) {
    alert('Ошибка: ' + e.message);
});
