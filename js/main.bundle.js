(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _popup = require('./modules/popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var popups = {};

$(function () {
    var _this = this;

    if ($('.js-slider').length) {
        $('.js-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<div class="slick-arrow slick-prev"></div>',
            nextArrow: '<div class="slick-arrow slick-next"></div>'
        });
    }
    if ($('.js-slider_vert').length) {

        $('.js-slider_vert').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            // vertical: true,
            autoplay: true,
            autoplaySpeed: 2000
            // prevArrow: '<div class="slick-arrow slick-prev"></div>',
            // nextArrow: '<div class="slick-arrow slick-next"></div>'
        });
    }

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
            $('body').on('click', '.js-open-tab', function (e) {
                if (e.target.tagName == 'H3' || e.target.tagName == 'SPAN') {

                    if ($(this).hasClass('doctor__wrap')) {
                        var doctorId = $(this).attr('data-doctor-id');
                        var doctorInfo = '';
                        $.ajax({
                            url: 'doctor-info.json',
                            // type: form.attr('method'),
                            // url: form.attr('action'),
                            // dataType: 'json',
                            // data: data,

                            success: function success(data) {
                                function parseArr(arr) {

                                    if (Array.isArray(arr)) {
                                        for (var i = 0; i < arr.length; i++) {
                                            var specTr = (specTr ? specTr : '') + '' + arr[i] + '<br/>';
                                        }
                                        return specTr;
                                    } else {
                                        return arr;
                                    }
                                }

                                console.log(data);

                                var certif = data.certificates;
                                var containerDoctorInfo = $('.doctor__content');

                                containerDoctorInfo.html('');

                                for (var i = 0; i < certif.length; i++) {
                                    // console.log(certif[i].text);
                                    var certifHtml = (certifHtml ? certifHtml : '') + '<li>' + (certif[i].icon ? '<div class="doctor__sertificat doctor__sertificat_icon js_popup_sert"><img src="' + certif[i].icon + '" alt=""></div>' : '') + (certif[i].text ? '<div class="doctor__sertificat doctor__sertificat_text">' + certif[i].text + '</div>' : '') + (certif[i].image ? '<div class="doctor__sertificat_img"><img class="img_big" src="' + certif[i].image + '" alt=""></div>' : '') + '</li>';
                                }

                                doctorInfo = '<div class="doctor__content_title">' + '<span>' + data.name + '</span>' + '</div>' + '<div class="doctor__content_left">' + '<div class="doctor__content_foto">' + '<img src=' + data.photo + ' alt=""></div>' + '</div>' + '<div class="doctor__content_right">' + '<table><tbody>' + '<tr><th>Клиника:</th><td>' + data.department + '</td></tr>' + '<tr><th>Отделение:</th><td>' + parseArr(data.position) + '</td></tr>' + '<tr><th>Специализация:</th><td>' + parseArr(data.specialization) + '</td></tr>' + '<tr><th>Учёная степень:</th><td>' + parseArr(data.department) + '</td></tr>' + '<tr><th>Образование:</th><td>' + parseArr(data.education) + '</td></tr>' + '<tr><th>Врачебный стаж:</th><td>' + parseArr(data.worktime) + '</td></tr>' + '<tr><th>Языки консультаций:</th><td>' + parseArr(data.languages) + '</td></tr>' + '<tr><th>Сертификаты:</th><td>' + '<ul>' + certifHtml + '</ul></td></tr>' + '<tr><th>Публикации:</th><td>' + parseArr(data.publications) + '</td></tr>' + '<tr><th>Дополнительные<br/>сведения:</th><td>' + parseArr(data.other) + '</td></tr>' + '</tbody></table></div>';

                                containerDoctorInfo.append(doctorInfo);
                                doctorInfo = '';
                            },
                            error: function error(_error) {
                                // console.log(error);
                            }
                        });
                    }

                    var checkContent = $(this).children('.doctor__content'),
                        checkParagraf = $(this).children('p');

                    if (checkContent.length || checkParagraf.length) {
                        if ($(this).hasClass('open')) {
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

    var SertifPopup = new _popup2.default({
        backSelector: '.popup__back',
        popupsSelector: '.popup',
        popupSelector: '.popup_sertificat',
        popupActiveClass: 'show',
        backActiveClass: 'show',
        // closeButtonsSelector: '.popup__close-button, .js-bad-answer-close',
        customOpen: function customOpen($elem) {
            this.$popup.find('.popup__img img').attr('src', $elem);
            this.openPopup();
        }
    });
    popups.SertifPopup = SertifPopup;

    $('.popup__close-button').on('click', function (e) {
        e.preventDefault();
        var popup = $(_this).parent('.popup');
        popup.removeClass('show');
    });

    $('body').on('click', '.js_popup_sert', function () {
        var $img = $(this).siblings('.doctor__sertificat_img'),
            $src = $img.find('img').attr('src');
        SertifPopup.customOpen($src);
        // popups.SertifPopup.openPopup();
    });

    $('.popup__back').on('click', function () {

        var $body = $('body');
        $body.css('overflow', 'auto');
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
        // var formType = form.data('form-type');
        var data = form.serialize();
        var container = $('.container');
        var countryWrap = container.find('.counrty__wrap');

        if (formType == "ajax") {

            $.ajax({
                // url: 'price.json',
                // url: 'contacts.json',
                // type: form.attr('method'),
                url: form.attr('action'),
                // dataType: 'json',
                // data: data,

                success: function success(data) {

                    if (formId == 'filterContact') {
                        $('.contacts__connection_list').html('');

                        data.clinics.forEach(function (el) {

                            var itemAdress = (itemAdress ? itemAdress : '') + '<li class="contacts__connection_item">' + '<ul>' + '<li class="contacts__connection_adress"><span>' + el.name + '</span></li>' + '<li class="contacts__connection_phone"><span>' + el.phones + '</span></li>' + '<li class="contacts__connection_site">' + '<a href="' + el.web + '">' + el.web + '</a></li>' + '<li class="contacts__connection_mail">' + '<a href="mailto:' + el.email + '">' + el.email + '</a></li>' + '</ul></li>';

                            $('.contacts__connection_list').append(itemAdress);
                        });
                    } else {
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

                                        doctorsHtml += '<div class="doctor__wrap js-open-tab" data-doccor-id="' + doctorsArr[k].id + '">' + '<h3 class="doctor__wrap_name">' + doctorsArr[k].name + '</h3>' + '<div class="doctor__content"></div></div>';
                                    }
                                }
                                ;
                            }

                            if (formId == 'filterClinic') {
                                clinicClass = 'clinics';
                                clinicArr = el.clinics;

                                for (var _i = 0; _i < clinicArr.length; _i++) {
                                    var clinicItem = clinicArr[_i];
                                    console.log(clinicItem);
                                    var clinicLogo = clinicItem.logo ? '<img src=' + clinicItem.logo + ' alt="">' : '<img src="/img/default_logo.png" alt="" class="default__img">';
                                    var clinicHtml = '<div class="clinics__clinic_name counrty__clinic_name">' + '<div class="counrty__clinic_left">' + clinicLogo + '</div>' + '<div class="counrty__clinic_right"><span>' + clinicItem.name + '</span>' + '<em>' + clinicItem.about + '</em></div></div>';
                                }
                            }

                            if (formId == 'filterPrice') {
                                clinicClass = 'price';
                                clinicArr = el.clinics;
                                for (var _i2 = 0; _i2 < clinicArr.length; _i2++) {

                                    if (clinicArr[_i2].doctors) {
                                        var doctorPriceDefault = '<div class="price__decription_text">*Стоимость консультации у перечисленных ниже докторов может<br/>отличаться от стоимости консультации клиники</div>';
                                        var doctorPriceInfo = '';

                                        for (var _k = 0; _k < clinicArr[_i2].doctors.length; _k++) {
                                            var doctorItem = clinicArr[_i2].doctors[_k];

                                            doctorPriceInfo += '<div class="price__item">' + '<span class="price__prop js_doctor-info">' + doctorItem.name + '</span>' + '<div class="price__dots"></div>' + '<span class="price__value">' + doctorItem.cost + '</span></div>';

                                            var doctorsList = '<div class="price__list price__list_doctors" data-id="' + doctorItem.id + '">' + doctorPriceInfo + '</div>';
                                        }
                                    }

                                    priceHtml += '<div class="price__item">' + '<span class="price__prop">Стоимость консультации</span>' + '<div class="price__dots"></div>' + '<span class="price__value">' + clinicArr[_i2].cost + ' ' + el.currency + '</span> ' + '</div>';

                                    priceContainerHtml = '<div class="price__list"> ' + priceHtml + '</div>' + (clinicArr[_i2].doctors ? doctorPriceDefault + doctorsList : '');
                                }
                                ;
                            }

                            for (var _i3 = 0; _i3 < clinicArr.length; _i3++) {
                                var clinicItem = clinicArr[_i3];

                                if (clinicClass == 'doctor') {
                                    clinicItem = clinicArr[_i3].clinic;
                                }

                                var clinicLogo = clinicItem.logo ? '<img src=' + clinicItem.logo + ' alt="">' : '<img src="/img/default_logo.png" alt="" class="default__img">';
                                var clinicsHtml = '<div class="' + clinicClass + '__clinic counrty__clinic">' + '<div class="' + clinicClass + '__clinic_name counrty__clinic_name">' + '<span>' + clinicItem.name + '</span>' + '<em>' + clinicItem.about + '</em>' + clinicLogo + '</div>' + (priceContainerHtml ? priceContainerHtml : '') + '</div>';
                            }
                            if (clinicClass == 'clinics') {
                                countryWrap.append('<div class="' + clinicClass + '__country counrty__clinic">' + '<h3>' + el.country + '</h3>' + clinicHtml + '' + (doctorsHtml ? doctorsHtml : '') + '</div>');
                            } else {
                                countryWrap.append('<div class="' + clinicClass + '__country counrty">' + '<h3>' + el.country + '</h3>' + clinicsHtml + '' + (doctorsHtml ? doctorsHtml : '') + '</div>');
                            }
                        });
                    }
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

    var doctorInfoPopup = new _popup2.default({
        backSelector: '.popup__back',
        popupsSelector: '.popup',
        popupSelector: '.popup_doctor-info',
        popupActiveClass: 'show',
        backActiveClass: 'show',
        closeButtonsSelector: '.popup__close-button, .js-bad-answer-close',
        customOpen: function customOpen($elem) {
            var container = this.$popup.find('.doctor-info');
            container.html('');
            container.append($elem);
            this.openPopup();
        }
    });
    popups.doctorInfoPopup = doctorInfoPopup;

    $('body').on('click', '.js_doctor-info', function () {

        var idDoctor = $(this).data('id');
        var doctorInfo = '';
        console.log('asdasd');

        $.ajax({
            url: 'doctor-info.json',
            // url: 'contacts.json',
            // type: 'POST',
            // url: form.attr('action'),
            // dataType: 'json',
            // data: 'doctorID': idDoctor,

            success: function success(data) {
                function parseArr(arr) {
                    if (Array.isArray(arr)) {
                        for (var i = 0; i < arr.length; i++) {
                            var specTr = (specTr ? specTr : '') + '' + arr[i] + '<br/>';
                        }
                        return specTr;
                    } else {
                        return arr;
                    }
                }

                var certif = data.certificates;
                var containerDoctorInfo = $('.doctor__content');

                containerDoctorInfo.html('');

                for (var i = 0; i < certif.length; i++) {
                    // console.log(certif[i].text);
                    var certifHtml = (certifHtml ? certifHtml : '') + '<tr><th>' + (certif[i].icon ? '<div class="doctor__sertificat doctor__sertificat_icon js_popup_sert"><img src="' + certif[i].icon + '" alt=""></div>' : '') + (certif[i].image ? '<div class="doctor__sertificat_img"><img class="img_big" src="' + certif[i].image + '" alt=""></div>' : '') + '</th><td>' + (certif[i].text ? '<div class="doctor__sertificat doctor__sertificat_text">' + certif[i].text + '</div>' : '') + '</td></tr>';
                }

                doctorInfo = '<div class="doctor-info__name">' + data.name + '</div>' + '<div class="doctor-info__left">' + '<div class="doctor-info__foto">' + '<img src=' + data.photo + ' alt=""></div>' + '<a href="" class="doctor-info__btn btn">Оставить заявку <br/> на консультацию</a>' + '</div>' + '<div class="doctor-info__right">' + '<div class="doctor-info__content">' + '<table><tbody>' + '<tr><th>Клиника:</th><td>' + data.department + '</td></tr>' + '<tr><th>Отделение:</th><td>' + parseArr(data.position) + '</td></tr>' + '<tr><th>Специализация:</th><td>' + parseArr(data.specialization) + '</td></tr>' + '<tr><th>Учёная степень:</th><td>' + parseArr(data.department) + '</td></tr>' + '<tr><th>Образование:</th><td>' + parseArr(data.education) + '</td></tr>' + '<tr><th>Врачебный стаж:</th><td>' + parseArr(data.worktime) + '</td></tr>' + '<tr><th>Языки консультаций:</th><td>' + parseArr(data.languages) + '</td></tr>' + '<tr><th>Сертификаты:</th></th><tr>' + certifHtml + '<tr><th>Публикации:</th><td>' + parseArr(data.publications) + '</td></tr>' + '<tr><th>Дополнительные<br/>сведения:</th><td>' + parseArr(data.other) + '</td></tr>' + '</tbody></table></div></div>';

                doctorInfoPopup.customOpen(doctorInfo);
                doctorInfo = '';
            },
            error: function error(_error3) {
                console.log(_error3);
            }
        });
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
			this.$body.css('overflow', 'hidden');
		}
	}, {
		key: 'closePopup',
		value: function closePopup() {

			// this.closeAll();
			this.$body.css('overflow', 'auto');

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
			this.$body.css('overflow', 'auto');
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
			this.$body.css('overflow', 'auto');

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
			var top = $('html,body').scrollTop() + 20;
			// let top = parseInt(this.$body.outerHeight()) / 2 - this.$popup.outerHeight() / 2;
			this.$popup.css('top', top + 'px');
		}
	}]);

	return Popup;
}();

exports.default = Popup;

},{}]},{},[1])

//# sourceMappingURL=main.bundle.js.map
