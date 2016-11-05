$(document).ready(function(){
  $('.sliders__controls-buttons').on('click', function(e){
    e.preventDefault();

    var
      $this = $(this),
      container = $this.closest('.sliders'),
      list = container.find('.my__slider-list'),
      items = container.find('.my__sliders-item'),
      activeSlide = items.filter('.active'),
      nextSlide = activeSlide.next(),
      prevSlide = activeSlide.prev(),
      firstSlide = items.first(),
      lastSlide = items.last(),
      sliderOffset = container.offset().left,
      reqPos = 0;

    if ($(this).hasClass('sliders__controls-buttons-next')) {

      if (nextSlide.length) {
        findReqPos(nextSlide);
        removeActiveClass(nextSlide);
      } else {
        findReqPos(firstSlide);;
        removeActiveClass(firstSlide);
      }
    } else {

      if (prevSlide.length) {
        findReqPos(prevSlide);
        removeActiveClass(prevSlide);
      } else {
        findReqPos(lastSlide);;
        removeActiveClass(lastSlide);
      }
    }
    list.css('left', '-=' + reqPos + 'px');

  function  removeActiveClass (reqSlide) {
    reqSlide.addClass('active').siblings().removeClass('active');
  }
  function findReqPos (slide) {
    reqPos = slide.offset().left - sliderOffset;
  }

  });
});

$(document).ready(function () {
    var sizeOffset = 100,
        classAnimated = 'visible animated';

    $('.left-animations').addClass("hidden").viewportChecker({
        classToAdd: classAnimated + ' fadeInLeft',
        offset: sizeOffset
    });
    $('.right-animations').addClass("hidden").viewportChecker({
        classToAdd: classAnimated + ' fadeInRight',
        offset: sizeOffset
    });
    $('.up-animations').addClass("hidden").viewportChecker({
        classToAdd: classAnimated + ' fadeInUp',
        offset: sizeOffset
    });
    $('.down-animations').addClass("hidden").viewportChecker({
        classToAdd: classAnimated + ' fadeInDown',
        offset: sizeOffset
    });

    $('.navigation__menu').on('click', 'a', function (e) {

        e.preventDefault();

        var id = $(this).attr('href'),
            top = $(id).offset().top - 30;

        $('html, body').animate({scrollTop: top}, 1000);

    });

    ///////////// таймер

    var clock;
    clock = $('.clock').FlipClock({
        clockFace: "DailyCounter",
        autoStart: false,
        callbacks: {
            showSeconds: false,
            stop: function () {
                $('.message').html('Время прошло');
            }
        }
    });
    var dt = "November 11 2016 20:22:48";
    var first = new Date(dt);
    var last = Date.now();
    var remaining = first - last;
    remaining /= 1000;
    clock.setTime(remaining);
    clock.setCountdown(true);
    clock.start();

    $('.bxslider').bxSlider({
        auto: true,
        autoControls: true,
        slideWidth: 450,
        slideMargin: 10
    });

    $('.controls__tabs-link').on('click', function (e) {
        e.preventDefault();

        var item = $(this).closest('.controls__tabs-item'),
            contentItem = $('.tabs__item'),
            itemPosition = item.data('class');
        contentItem.filter('.tabs__item_' + itemPosition)
            .add(item)
            .addClass('active')
            .siblings()
            .removeClass('active');
    });

    $('#feedback-form').validate({
        rules : {
            username : {required : true, minlength: 2},
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            }
        },
        messages : {
            username : {
                required : "Введите ваше имя",
                minlength : "Введите не менее, чем 2 символа."
            },
            email: {
                required: "Введите ваш E-mail",
                email: "Неверный формат E-mail(name@domain.com)"
            },
            phone: {
                required: "Введите ваш Телефон"
            }
        }
    });

    $(".toggle_mnu").click(function() {
        $(".sandwich").toggleClass("active");
    });

    $(".top_mnu ul a").click(function() {
        $(".top_mnu").fadeOut(600);
        $(".sandwich").toggleClass("active");
        $(".top_text").css("opacity", "1");
    }).append("<span>");

    $(".toggle_mnu").click(function() {
        if ($(".top_mnu").is(":visible")) {
            $(".top_text").css("opacity", "1");
            $(".top_mnu").fadeOut(600);
            $(".top_mnu li a").removeClass("fadeInUp animated");
        } else {
            $(".top_text").css("opacity", ".1");
            $(".top_mnu").fadeIn(600);
            $(".top_mnu li a").addClass("fadeInUp animated");
        };
    });

});//jQue


$(window).scroll(function () {
    var $menu = $('#menu');
    var st = $(this).scrollTop();

    $('.wrap-parallax').css({
        "transform": "translate(0%, " + st / 8 + "%"
    });
    $(".input__phone").mask("+7 (999) 999-9999");

    if ($(this).scrollTop() > 600 && $menu.hasClass("header__top")) {
        $menu.fadeOut('fast', function () {
            $(this).removeClass(' header__top ')
                    .addClass("fixed transbg")
                    .fadeIn('fast');
        });
    } else if ($(this).scrollTop() <= 1 && $menu.hasClass("fixed")) {
        $menu.fadeOut('fast', function () {
            $(this).removeClass("fixed transbg")
                    .addClass("header__top")
                    .fadeIn('fast');
        });
    }

    $menu.hover(
        function () {
            if ($(this).hasClass('fixed')) {
                $(this).removeClass('transbg');
            }
        },
        function () {
            if ($(this).hasClass('fixed')) {
                $(this).addClass('transbg');
            }
        });
});
$(document).ready(function(){
});