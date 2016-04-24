(function() {
    var myMap,
        clickCoords,
        mapClusterer,
        markArray = [],
        soloPlacemark;

    new Promise(function(resolve) {
        ymaps.ready(resolve);
    }).then(function() {
        return new Promise(function(resolve) {
            myMap = new ymaps.Map("map", {
                center:  [59.93667, 30.31500],
                zoom: 9
            });
            resolve(myMap);
        });
    }).then(function(myMap) {
        return new Promise(function(resolve, reject) {
            var reqGet  = new XMLHttpRequest(),
                reqData = {op: "all"};
            reqGet.open('POST', 'http://smelukov.com:3000');

            reqGet.onload = function(e) {
                var data = JSON.parse(reqGet.response);
                for (var adr in data) {
  								markArray.push({
  									address: adr,
  									marks: data[adr]
  								});
  							}
                resolve(data);
            };
            reqGet.send(JSON.stringify(reqData));
        });

    }).then(function(data) {
      return new Promise(function(resolve) {
        var markaKeys = Object.keys(data);
            popup = document.querySelector('.popup'),
            close = document.querySelector('.close'),
            form = document.querySelector('.form'),
            listReview = document.querySelector('.review__list'),
            newLi = document.createElement('li'),
            headerName = document.querySelector('.adress__name'),

            customItemContentLayout = ymaps.templateLayoutFactory.createClass(
              '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
              '<div class=ballon_body><a href="#" class="baloon__link">{{ properties.balloonContentBody|raw }}</a></div>' +
              '<div class=ballon_content>{{ properties.balloonContentContent|raw }}</div>' +
              '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
            ),

            mapClusterer = new ymaps.Clusterer({
              clusterDisableClickZoom: true,
              clusterOpenBalloonOnClick: true,
              clusterBalloonContentLayout: 'cluster#balloonCarousel',
              clusterBalloonItemContentLayout: customItemContentLayout,
              clusterBalloonPanelMaxMapArea: 0,
              clusterBalloonContentLayoutWidth: 250,
              clusterBalloonContentLayoutHeight: 150,
              clusterBalloonPagerSize: 5
            }),

            geoObjects = [];
              markArray.forEach(function(obj, ind) {
                obj.marks.forEach(function(markObj){
                  createMark(markObj);
              })
            });

        mapClusterer.add(geoObjects);
        myMap.geoObjects.add(mapClusterer);

        document.addEventListener('click', showReview);

        function showReview(e) {
          if (e.target.getAttribute('class') === 'baloon__link') {
            new Promise(function(resolve, reject) {
                var link      = e.target,
                    linkText  = link.innerText,
                    req       = {
                      op: "get",
                      address: linkText
                    },
                    xhrReview = new XMLHttpRequest();

                xhrReview.open('POST', 'http://smelukov.com:3000');
                xhrReview.onload = function() {
                    var data = JSON.parse(xhrReview.response);
                    resolve(data);
                };
                xhrReview.send(JSON.stringify(req));

            }).then(function(data) {
              var linkKeys = Object.keys(data);

              myMap.balloon.close();
              popup.classList.remove('hide');
              listReview.innerHTML = '';

              linkKeys.forEach(function(value, ind) {
                var coordsLink = [],
                    address = data[value].address,
                    parseDate = new Date(data[value].date),
                    place = data[value].place,
                    text   = data[value].text,
                    name   = data[value].name,
                    naweDate = getTime(parseDate);

                coordsLink.push(data[value].coords.x);
                coordsLink.push(data[value].coords.y);

                headerName.innerHTML = address;
                newLi.classList.add('review__item');
                newLi.innerHTML = '<b>'+ name +'</b> <span>'+ place +'</span> <span>'+
                naweDate +'</span> <p>'+ text +'</p>';
                listReview.appendChild(newLi);

                clickCoords = {pos:coordsLink, address:address};

              });
            });
          } else if(e.target.getAttribute('class') === 'close'){
            listReview.innerHTML = '';
            popup.classList.add('hide');
          }
        }

        myMap.events.add('click', function (e){
  				var coords = e.get('coords');
          if (soloPlacemark) {
            soloPlacemark.geometry.setCoordinates(coords);
          } else {
            soloPlacemark = new ymaps.Placemark(coords, {
            }, {
                preset: 'islands#violetStretchyIcon',
                draggable: false
            });
            myMap.geoObjects.add(soloPlacemark);
          }
  				ymaps.geocode(coords, {
					results: 1
	  		  }).then(function(res){
				      var address = null;
				      if (res.geoObjects.get(0)) {
                var address = res.geoObjects.get(0).properties.get('text');
					      headerName.innerHTML = address;
                listReview.innerHTML = '';
				    	  popup.classList.remove('hide');
                clickCoords = {pos:coords, address:address};
              }
			    });
        });

      close.addEventListener('click', closePopup);
      function closePopup(e){
        listReview.innerHTML = '';
        popup.classList.add('hide');
      }

      // function createElement(nameValue, placeValue, naweDate, reviewValue){
      //   newLi.classList.add('review__item');
      //   newLi.innerHTML = '<b>'+ nameValue +'</b> <span>'+ placeValue +'</span> <span>'+
      //   naweDate +'</span> <p>'+ reviewValue +'</p>';
      //   listReview.appendChild(newLi);
      // }

      function createMark (mark) {
      	var myPlacemark = new ymaps.Placemark([mark.coords.x,mark.coords.y], { // create new mark
      		  iconContent: '1',
      		  balloonContentHeader: mark.name,
      		  balloonContentBody: '<div><a href="javascript:void(0);" class="baloon__link">' + mark.address + '</a></div><div>' + mark.text + '</div>',
      		  balloonContentFooter: prepareDate(mark.date),
      		  hintContent: 'Стандартный значок метки'
      	},
      	{
      		preset: 'twirl#violetIcon'
      	});
      	mapClusterer.add(myPlacemark);
      }

      function getTime (date) {
        function doubleNumber (num) {
          return num < 10 ? '0' + num : num;
        }
        var now = date ? new Date(date) : new Date();
        return  now.getFullYear() + '.' +
        doubleNumber(now.getMonth()) + '.' +
        doubleNumber(now.getDate()) + ' ' +
        doubleNumber(now.getHours()) + ':' +
        doubleNumber(now.getMinutes()) + ':' +
        doubleNumber(now.getSeconds());
      }

      function prepareDate (date) {
  			return (date.length == parseInt(date).toString().length || typeof date == 'number' ? getTime(parseInt(date)) : date);
  		}

      form.addEventListener('submit', sendAjax);
      function sendAjax(e) {
        e.preventDefault();
        var req = new XMLHttpRequest(),
            nameValue = form.name.value,
            placeValue = form.place.value,
            reviewValue = form.review.value,
            date = new Date(),
            naweDate = getTime(date),
            data = {
              'op': 'add',
              'review': {
                'coords':{
                    'x': clickCoords.pos[0],
                    'y': clickCoords.pos[1]
                  },
                  'address': clickCoords.address,
                  'name'   : nameValue,
                  'place'  : placeValue,
                  'text'   : reviewValue,
                  'date'   : naweDate
            }
          },
          newMark = {
            coords: {'x': clickCoords.pos[0], 'y' : clickCoords.pos[1]},
            address: clickCoords.address,
            name: nameValue,
            place: placeValue,
            text: reviewValue,
            date: naweDate
          };

          if (nameValue && placeValue && reviewValue) {
            req.open('POST', 'http://smelukov.com:3000');
            req.send(JSON.stringify(data));
            req.onload = function() {
              newLi.classList.add('review__item');
              newLi.innerHTML = '<b>'+ nameValue +'</b> <span>'+ placeValue +'</span> <span>'+
              naweDate +'</span> <p>'+ reviewValue +'</p>';
              listReview.appendChild(newLi);
              createMark(newMark);
              myMap.geoObjects.remove(soloPlacemark);
            };
          form.name.value = '';
          form.place.value = '';
          form.review.value = '';
        }
      }
    });
    }).catch(function(e) {
      alert('Ошибка: ' + e.message);
    });
}());
