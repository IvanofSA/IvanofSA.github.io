(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _popup = require('./modules/popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var popups = {};

$(function () {
    var _this = this;

    $('.js-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-arrow slick-prev"></div>',
        nextArrow: '<div class="slick-arrow slick-next"></div>'
    });

    // $(window).scroll(function () {
    //     var $menu = $('.header');
    //
    //     if ($(this).scrollTop() > 200 && $menu.hasClass("header__top")) {
    //         $menu.fadeOut('fast', function () {
    //             $(this).removeClass(' header__top ')
    //                 .addClass("fixed")
    //                 .fadeIn('fast');
    //         });
    //     } else if ($(this).scrollTop() <= 1 && $menu.hasClass("fixed")) {
    //         $menu.fadeOut('fast', function () {
    //             $(this).removeClass("fixed")
    //                 .addClass("header__top")
    //                 .fadeIn('fast');
    //         });
    //     }
    //
    // });

    var options = {
        id: 61042406,
        loop: true
    };
    //

    var video = $("#video");
    var playBtn = $('.play');
    if (video.length) {
        var player = new Vimeo.Player(video, options);
    }

    playBtn.on('click', function (e) {
        e.preventDefault();
        var preview = $(this).parent('.preview'),
            video = preview.siblings('.video__vimeohttps');

        if (preview) {
            preview.addClass('hide');
            video.removeClass('hide').addClass('show');

            player.play();
            e.preventDefault();
        }
    });

    //ToDO Переделать в полноценный модуль

    var tab = {
        $openBtn: $('.js-open-tab'),
        $tabParent: $('.js-open-tab h3'),

        open: function open(target, index) {

            if (target == 'next') {

                if (index >= this.lengthBlocks) {
                    this.$tabParent.eq(0).addClass('open');
                } else {
                    this.$tabParent.eq(index).addClass('open');
                }
            } else {
                target.closest('.js-open-tab').addClass('open');
            }
        },
        close: function close() {
            this.$openBtn.removeClass('open');
        },
        controller: function controller() {
            var that = this;
            that.$openBtn.on('click', function (e) {
                if (e.target.tagName == 'H3' || e.target.tagName == 'SPAN') {

                    if ($(this).hasClass('doctor__wrap')) {
                        var doctorId = $(this).attr('data-doctor-id');

                        $.ajax({
                            url: 'doctor-info.json',
                            // type: form.attr('method'),
                            // url: form.attr('action'),
                            // dataType: 'json',
                            // data: data,

                            success: function success(data) {
                                console.log(data);

                                function parseArr(arr) {

                                    if (Array.isArray(arr)) {
                                        for (var i = 0; i < arr.length; i++) {
                                            var specTr = (specTr ? specTr : '') + '' + arr[i];
                                        }
                                        return specTr;
                                    } else {
                                        return arr;
                                    }
                                }

                                var certif = data.certificates;

                                for (var i = 0; i < certif.length; i++) {
                                    console.log(certif[i].text);
                                    var certifHtml = certifHtml + '<li><span>' + certif[i].text + '</span><img src="' + certif[i].icon + '" alt=""><img class="img_big" src="' + certif[i].image + '" alt=""></li>';
                                }

                                var doctorInfo = '<div class="doctor__content_title">' + '<span>Фамильный Доктор Сергеевич</span>' + '</div>' + '<div class="doctor__content_left">' + '<div class="doctor__content_foto">' + '<img src="/img/doctor-1.png" alt=""></div>' + '</div>' + '<div class="doctor__content_right">' + '<table><tbody>' + '<tr><th>Отделение</th><td>' + data.department + '</td></tr>' + '<tr><th>Специализация:</th><td>' + parseArr(data.specialization);+'</td></tr>';
                                '<tr><th>Учёная степень:</th><td>' + parseArr(data.department);+'</td></tr>' + '<tr><th>Образование:</th><td>' + parseArr(data.education);+'</td></tr>' + '<tr><th>Врачебный стаж:</th><td>' + parseArr(data.worktime);+'</td></tr>' + '<tr><th>Языки консультаций:</th><td>' + parseArr(data.languages);+'</td></tr>' + '<tr><th>Сертификаты:</th><td>' + '<ul>' + certifHtml + '</ul></td></tr>' + '<tr><th>Публикации:</th><td>' + parseArr(data.publications);+'</td></tr>' + '<tr><th>Дополнительные сведения:</th><td>' + parseArr(data.other);+'</td></tr>' + '</tbody></table></div>';

                                var containerDoctorInfo = $('.doctor__content');
                                containerDoctorInfo.html(doctorInfo);
                            },
                            error: function error(_error) {
                                console.log(_error);
                            }
                        });
                    }

                    var checkContent = $(this).children('.doctor__content'),
                        checkParagraf = $(this).children('p');

                    if (checkContent.length || checkParagraf.length) {
                        if ($(this).hasClass('open')) {
                            console.log('sad');
                            $(this).removeClass('open');
                        } else {
                            var currentIndex = that.$tabParent.index(parent);
                            if (that.$tabParent.hasClass('open')) {
                                that.close();
                                that.open('next', ++currentIndex);
                            } else {
                                that.close();
                                that.open($(this));
                            }
                        }
                    }
                }
            });
        },
        init: function init() {
            this.controller();
        }
    };
    tab.init();

    $('.popup__back').on('click', function () {

        var $body = $('body');
        if ($body.find('.popup').filter('.show').length == '1') {
            $body.find('.popup').filter('.show').removeClass('show');
            $body.find('.popup__back').filter('.show').removeClass('show');
            $(_this).removeClass('show');
        } else {
            $body.find('.popup').filter('.show').last().removeClass('show');
        }
    });

    var loginPopup = new _popup2.default({
        backSelector: '.popup__back',
        popupsSelector: '.popup',
        popupSelector: '.popup_login',
        popupActiveClass: 'show',
        backActiveClass: 'show',
        closeButtonsSelector: '.popup__close-button, .js-bad-answer-close'
        // customOpen: function ($elem) {
        // 	this.$popup.find('.popup__text_good-answer').text($elem);
        // 	this.openPopup();
        // }
    });
    popups.loginPopup = loginPopup;

    $('.js-login').on('click', function (e) {
        e.preventDefault();
        popups.loginPopup.openPopup();
    });

    $('select').on('change', function (e) {

        var form = $(this.form);
        var formId = form.attr('id');
        var formType = form.data('form-type');
        var data = form.serialize();
        var container = $('.container');
        var countryWrap = container.find('.counrty__wrap');

        if (formType == "ajax") {

            $.ajax({
                url: 'doctor.json',
                // type: form.attr('method'),
                // url: form.attr('action'),
                // dataType: 'json',
                // data: data,

                success: function success(data) {
                    countryWrap.html('');

                    data.forEach(function (el) {
                        var clinicClass = '',
                            clinicArr,
                            doctorsHtml = '',
                            priceContainerHtml = '',
                            priceHtml = '';

                        if (formId == 'filterDoctor') {
                            clinicClass = 'doctor';
                            clinicArr = el.clinics;

                            for (var i = 0; i < clinicArr.length; i++) {
                                var doctorsArr = clinicArr[i].doctors;
                                for (var k = 0; k < doctorsArr.length; k++) {

                                    doctorsHtml += '<div class="doctor__wrap js-open-tab" data-doccor-id="' + doctorsArr[k].id + '">' + '<h3>' + doctorsArr[k].name + '</h3>' + '</div>';
                                }
                            };
                        }

                        if (formId == 'filterClinic') {
                            clinicClass = 'clinics';
                            clinicArr = el.clinics;
                        }

                        if (formId == 'filterPrice') {
                            clinicClass = 'price';
                            clinicArr = el.clinics;

                            for (var _i = 0; _i < clinicArr.length; _i++) {
                                priceHtml += '<div class="price__item">' + '<span class="price__prop">Первичная консультация</span>' + '<div class="price__dots"></div>' + '<span class="price__value">' + clinicArr[_i].cost + ' ' + el.currency + '</span> ' + '</div>';

                                priceContainerHtml = '<div class="price__list"> ' + priceHtml + '</div>';
                            };
                        }

                        for (var _i2 = 0; _i2 < clinicArr.length; _i2++) {
                            var clinicItem = clinicArr[_i2];

                            if (clinicClass == 'doctor') {
                                clinicItem = clinicArr[_i2].clinic;
                            }

                            var clinicLogo = clinicItem.logo ? '<img src=' + clinicItem.logo + ' alt="">' : '';
                            var clinicsHtml = '<div class="' + clinicClass + '__clinic counrty__clinic">' + '<div class="' + clinicClass + '__clinic_name counrty__clinic_name">' + '<span>' + clinicItem.name + '</span>' + '<em>' + clinicItem.about + '</em>' + clinicLogo + '</div>' + (priceContainerHtml ? priceContainerHtml : '') + '</div>';
                        }

                        countryWrap.append('<div class="' + clinicClass + '__country counrty">' + '<h3>' + el.country + '</h3>' + clinicsHtml + '' + (doctorsHtml ? doctorsHtml : '') + '</div>');
                    });
                },
                error: function error(_error2) {
                    console.log(_error2);
                }
            });
        }
    });

    $('.js-show-attention').on('click', function (e) {
        e.preventDefault();
        console.log();

        var attentionBlock = $('.contacts__connection');
        attentionBlock.toggleClass('hide');
    });
});

},{"./modules/popup":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Popup = function () {
	function Popup(data) {
		_classCallCheck(this, Popup);

		this.$body = $('body');
		this.$back = $(data.backSelector);
		this.$popups = $(data.popupsSelector);
		this.popupSelector = data.popupSelector;
		this.$popup = this.$popups.filter(data.popupSelector);
		this.popupActiveClass = data.popupActiveClass;
		this.backActiveClass = data.backActiveClass;
		this.closeButtonsSelector = data.closeButtonsSelector;
		this.openButtonsSelector = data.openButtonsSelector;
		this.isCloseAllWhenOpen = data.isCloseAllWhenOpen || true;
		this.onResizeCallback = typeof data.onResizeCallback == "function" ? data.onResizeCallback : '';
		this.onCloseCallback = typeof data.onCloseCallback == "function" ? data.onCloseCallback : '';
		this.customOpen = typeof data.customOpen == "function" ? data.customOpen : '';

		this.addEventListners();
	}

	_createClass(Popup, [{
		key: 'addEventListners',
		value: function addEventListners() {
			var _this = this;

			$(this.openButtonsSelector).on('click', function (e) {
				e.preventDefault();
				_this.openPopup();
			});
			this.$popup.on('click', this.closeButtonsSelector, function () {
				_this.closePopup();
			});
			$(window).on('resize', function () {
				_this.$popup.css('left', '0');

				if (_this.$popup.hasClass(_this.popupActiveClass)) {

					_this.getLeft();
					_this.getTop();

					if (_this.onResizeCallback) {
						_this.onResizeCallback();
					}
				}
			});
		}
	}, {
		key: 'openPopup',
		value: function openPopup() {
			this.$popup.css('top', '-20px');
			this.showBack();
			this.getLeft();
			this.getTop();
			this.$popup.addClass(this.popupActiveClass);
		}
	}, {
		key: 'closePopup',
		value: function closePopup() {

			// this.closeAll();

			this.$popup.removeClass(this.popupActiveClass);
			if (!this.$popups.filter('.show').length) {
				this.hideBack();
			}

			if (this.onCloseCallback) {
				this.onCloseCallback();
			}
		}
	}, {
		key: 'closeAll',
		value: function closeAll() {
			this.$popups.removeClass(this.popupActiveClass);
		}
	}, {
		key: 'showBack',
		value: function showBack() {
			this.$back.addClass(this.backActiveClass);
		}
	}, {
		key: 'hideBack',
		value: function hideBack() {
			this.$back.removeClass(this.backActiveClass);
		}
	}, {
		key: 'getLeft',
		value: function getLeft() {
			var left = parseInt(this.$body.outerWidth()) / 2 - this.$popup.outerWidth() / 2;
			this.$popup.css('left', left + 'px');
		}
	}, {
		key: 'getTop',
		value: function getTop() {
			var top = this.$body.scrollTop() + 200;
			// let top = parseInt(this.$body.outerHeight()) / 2 - this.$popup.outerHeight() / 2;
			this.$popup.css('top', top + 'px');
		}
	}]);

	return Popup;
}();

exports.default = Popup;

},{}]},{},[1])

//# sourceMappingURL=main.bundle.js.map
