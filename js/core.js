$(document).ready(function () {

  function updateCounter(event, slider) {
    var owlInstance = slider.data('owl.carousel');
    var current, total;

    if (event && event.item) {
      current = event.item.index + 1;
      total = event.item.count;
    } else if (owlInstance) {
      current = owlInstance.current() + 1;
      total = owlInstance.items().length;
    } else {
      current = 1;
      total = slider.find('.result__item').length;
    }

    // Для loop режима (если вдруг включите)
    if (owlInstance && owlInstance.options.loop) {
      var realCurrent = current - 1;
      if (realCurrent < 1) realCurrent = total;
      if (realCurrent > total) realCurrent = 1;
      current = realCurrent;
    }

    $('.current-slide').text(current);
    $('.total-slides').text(total);
  }

  var $slider = $('.result__slider');
  $slider.owlCarousel({
    center: false,
    autoWidth: false,
    loop: false,
    margin: 15,
    dots: false,
    nav: true,
    navText: [
      `<img src="./img/sld-prev.svg">`,
      `<img src="./img/sld-next.svg">`
    ],
    responsive: {
      1200: {
        items: 1
      },
      768: {
        items: 1,
      },
      320: {
        margin: 12,
        items: 1.15,
      }
    },
    onInitialized: function (event) {
      updateCounter(event, $slider);
    },
    onChanged: function (event) {
      updateCounter(event, $slider);
    }
  });


  $('.about__slider').owlCarousel({
    center: false,
    items: 4,
    autoWidth: false,
    loop: true,
    margin: 40,
    dots: false,
    nav: true,
    navText: [
      `<img src="./img/sld-prev.svg">`,
      `<img src="./img/sld-next.svg">`
    ],
    responsive: {
      1200: {
        items: 4
      },
      768: {
        items: 3,
      },
      320: {
        items: 1.05,
      }
    },
  });

  $('#phone-mask').mask('+7(999)999-99-99', {
    placeholder: "+7(___)___-__-__"
  });


  // tab
  $('.tab').each(function () {
    var $container = $(this);
    var $tabs = $container.find('.tab-item');
    var $contents = $container.find('.tab-content');

    // Инициализация первого таба в каждом контейнере
    $contents.hide().first().show();
    $contents.removeClass('active').first().addClass('active');
    $tabs.removeClass('active').first().addClass('active');

    // Обработчик клика
    $tabs.click(function () {
      var index = $(this).index();
      var $parentContainer = $(this).closest('.tab');

      $parentContainer.find('.tab-item').removeClass('active');
      $(this).addClass('active');

      $parentContainer.find('.tab-content').hide().removeClass('active');
      $parentContainer.find('.tab-content').eq(index).show().addClass('active');
    });
  });

  //модальное окна
  $(document).on('click', '.modal-link', function (e) {
    e.preventDefault();
    var target = $(this).data('target');
    $(target).addClass('is-active');
    $('body').css('overflow', 'hidden');
  });

  function closeModal() {
    $('.modal').removeClass('is-active');
    $('body').css('overflow', '');
  }

  $(document).on('click', '.modal__close', function (e) {
    e.stopPropagation();
    closeModal();
  });
  $(document).on('click', '.modal__overlay', function () {
    closeModal();
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeModal();
    }
  });
  $(document).on('click', '.modal__content', function (e) {
    e.stopPropagation();
  });
  $(document).on('click', '.modal a', function (e) {
    if ($(this).attr('href')) {
      closeModal();
    }
  });

  // бургер
  $('.header__burger').on('click', function () {
    $('.header__nav').toggleClass('active');
    $(this).toggleClass('active');
    if ($('.header__nav').hasClass('active')) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', '');
    }
  });
  $('.header__nav-item').on('click', function () {
    if ($(window).width() < 768) {
      $('.header__nav').removeClass('active');
      $('.header__burger').removeClass('active');
      $('body').css('overflow', '');
    }
  });
  $(document).on('click', function (e) {
    if ($(window).width() < 768) {
      if (!$(e.target).closest('.header__nav, .header__burger').length) {
        $('.header__nav').removeClass('active');
        $('.header__burger').removeClass('active');
        $('body').css('overflow', '');
      }
    }
  });

});
