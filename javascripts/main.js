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

      function allowDrop(e) {
        e.preventDefault();
      }

      function drag(e) {
        e.dataTransfer.setData("text", e.target.id);
        // console.log(e.target.id);
      }

      function drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
        // console.log(e.target.id);
        console.log(document.getElementById(data));

      }
      
    return new Promise(function(resolve, reject) {
        VK.api('friends.get', {'fields':"photo"}, function(response) {
          console.log(response);
            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                var source = playerItemTemplate.innerHTML,
                    templateFn = Handlebars.compile(source),
                    template = templateFn({list: response.response});

                friendAll.innerHTML = template;

                resolve();
            }
        });
    });
}).catch(function(e) {
    alert('Ошибка: ' + e.message);
});








// .then(function(cityArr){
// 	search__all.addEventListener('keyup', addList);
//
// 	function addList(e) {
// 		console.log(this);
// 		var townFilter = cityArr.filter(filterFn, this);
// 		console.log(townFilter);
// 		block.innerHTML = '';
//
// 		for (var i = 0; i < townFilter.length; i++) {
// 			var newLi = document.createElement('li');
// 			newLi.innerHTML = townFilter[i];
// 			block.appendChild(newLi);
// 		}
// 	}
//
// 	function filterFn(el, ind, ar, thisArg) {
// 		var inpValue  = this.value;
// 		console.log(this.value);
// 		if (inpValue === '') {
// 			return false;
// 		}
// 		return el.indexOf(inpValue) !== -1;
// 	}
//
// })
