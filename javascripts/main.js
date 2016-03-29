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
            }

            function handleDragStart(e) {
              e.target.closest("li").setAttribute("id","transferElem");
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
              console.log(e.target.querySelectorAll('.avatar'));

              if (changePlus.getAttribute('data-role') === 'plus') {
                changePlus.setAttribute('data-role', 'minus');
                e.target.closest("li").setAttribute('draggable', 'false');
                changePlus.className = 'glyphicon glyphicon-minus';
              }

            };

            function handleDrop(e) {
              if (e.stopPropagation) {
                e.stopPropagation();
              }

              e.preventDefault();
              var data = e.dataTransfer.getData("text");
              friendSave.appendChild(document.getElementById(data));
            };

            var cols = document.querySelectorAll('.friendItem');

            [].forEach.call(cols, function(col) {
              col.addEventListener('dragstart', handleDragStart, false);
            });

            friendSave.addEventListener('drop', handleDrop, false);
            friendSave.addEventListener('dragover', handleDragOver, false);
            friendSave.addEventListener('dragend', handleDragEnd, false);
            friendWrap.addEventListener('click', transferFriend, false);


            function transferFriend(e) {
              var elemRemove = e.target.closest("li");
              var el = friendList.querySelector('.friend');
                console.log(el);
                if (e.target.getAttribute('data-role') === 'plus') {
                  elemRemove.setAttribute('draggable', 'false');
                  e.target.setAttribute('data-role', 'minus');
                  e.target.className = 'glyphicon glyphicon-minus';
                  friendSave.appendChild(elemRemove);

                } else if(e.target.getAttribute('data-role') === 'minus') {
                    elemRemove.setAttribute('draggable', 'true');
                    e.target.setAttribute('data-role', 'plus');
                    e.target.className = 'glyphicon glyphicon-plus';
                    friendList.appendChild(elemRemove);
                  }

            }
        });

    });
}).catch(function(e) {
    alert('Ошибка: ' + e.message);
});
