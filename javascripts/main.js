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
              e.dataTransfer.setData('text', e.target.id);

            }
            function handleDragOver(e) {
              if (e.preventDefault) {
                e.preventDefault();

              }
              // e.dataTransfer.dropEffect = 'move';
              //
              // return false;
            }
            function handleDrop(e) {
              if (e.stopPropagation) {
                e.stopPropagation();
              }

              e.preventDefault();
              var data = e.dataTransfer.getData("text");
              friendListGroup.appendChild(document.getElementById(data));

            }


            var cols = document.querySelectorAll('.list-group-item');

            [].forEach.call(cols, function(col) {

              col.addEventListener('dragstart', handleDragStart, false);

            });

            friendListGroup.addEventListener('drop', handleDrop, false);
            friendListGroup.addEventListener('dragover', handleDragOver, false);

        });

    });
}).catch(function(e) {
    alert('Ошибка: ' + e.message);
});
