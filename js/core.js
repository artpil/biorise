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



  // tab
  function initTabs($container) {
    var $tabs = $container.find('.tab-item');
    var $contents = $container.find('.tab-content');

    // Инициализация первого таба
    $contents.hide().first().show();
    $contents.removeClass('active').first().addClass('active');
    $tabs.removeClass('active').first().addClass('active');
  }

  // Инициализация всех табов на странице
  $('.tab').each(function() {
    initTabs($(this));
  });

  // Обработчик клика для всех табов с делегированием
  $(document).on('click', '.tab-item', function() {
    var $tab = $(this);
    var $container = $tab.closest('.tab');
    var tabText = $tab.text().trim();

    // Находим индекс по тексту таба внутри его контейнера
    var index = -1;
    $container.find('.tab-item').each(function(i) {
      if ($(this).text().trim() === tabText) {
        index = i;
        return false;
      }
    });

    if (index >= 0) {
      // Обновляем активные табы
      $container.find('.tab-item').removeClass('active');
      $container.find('.tab-item').eq(index).addClass('active');

      // Обновляем контент
      $container.find('.tab-content').hide().removeClass('active');
      $container.find('.tab-content').eq(index).show().addClass('active');
    }
  });

  function checkWidthAndInitCarousel() {

    if ($(window).width() < 768) {
      // Добавляем класс owl-carousel если его еще нет
      if (!$('.package__nav').hasClass('owl-carousel')) {
        $('.package__nav').addClass('owl-carousel');


        $('.package__nav.owl-carousel').owlCarousel({
          loop: false,
          margin: 16,
          nav: false,
          dots: false,
          items: 3,
          autoWidth: true,
          onInitialized: function() {

            updateActiveTabs();
          }
        });
      }


      if (!$('.format__nav').hasClass('owl-carousel')) {
        $('.format__nav').addClass('owl-carousel');
        $('.format__nav.owl-carousel').owlCarousel({
          loop: false,
          margin: 16,
          nav: false,
          dots: false,
          items: 2,
          autoWidth: true,
          onInitialized: function() {

            updateActiveTabs();
          }
        });
      }


      if (!$('.team__tab-content').hasClass('owl-carousel')) {
        $('.team__tab-content').addClass('owl-carousel');
        $('.team__tab-content.owl-carousel').owlCarousel({
          loop: false,
          margin: 16,
          nav: false,
          dots: false,
          items: 2,
          autoWidth: true,
          onInitialized: function() {
            updateActiveTabs();
          }
        });
      }


    } else {

      if ($('.package__nav').hasClass('owl-carousel')) {
        var packageOwl = $('.package__nav.owl-carousel');
        if (typeof packageOwl.data('owl.carousel') !== 'undefined') {
          packageOwl.owlCarousel('destroy');
        }
        $('.package__nav').removeClass('owl-carousel owl-loaded owl-drag');


        $('.package__nav').find('.owl-stage-outer, .owl-nav, .owl-dots').remove();
        $('.package__nav').removeAttr('style');
        $('.package__nav > *').removeAttr('style');
      }


      if ($('.format__nav').hasClass('owl-carousel')) {
        var formatOwl = $('.format__nav.owl-carousel');
        if (typeof formatOwl.data('owl.carousel') !== 'undefined') {
          formatOwl.owlCarousel('destroy');
        }
        $('.format__nav').removeClass('owl-carousel owl-loaded owl-drag');


        $('.format__nav').find('.owl-stage-outer, .owl-nav, .owl-dots').remove();
        $('.format__nav').removeAttr('style');
        $('.format__nav > *').removeAttr('style');
      }

      if ($('.team__tab-content').hasClass('owl-carousel')) {
        var formatOwl = $('.team__tab-content.owl-carousel');
        if (typeof formatOwl.data('owl.carousel') !== 'undefined') {
          formatOwl.owlCarousel('destroy');
        }
        $('.team__tab-content').removeClass('owl-carousel owl-loaded owl-drag');


        $('.team__tab-content').find('.owl-stage-outer, .owl-nav, .owl-dots').remove();
        $('.team__tab-content').removeAttr('style');
        $('.team__tab-content > *').removeAttr('style');
      }


      updateActiveTabs();
    }
  }


  function updateActiveTabs() {
    $('.tab').each(function() {
      var $container = $(this);
      var $activeTab = $container.find('.tab-item.active');
      var activeIndex = $container.find('.tab-item').index($activeTab);

      // Если активного таба нет, устанавливаем первый
      if (activeIndex === -1) {
        $container.find('.tab-item').first().addClass('active');
        $container.find('.tab-content').first().addClass('active').show();
      } else {
        // Синхронизируем контент с активным табом
        $container.find('.tab-content').hide().removeClass('active');
        $container.find('.tab-content').eq(activeIndex).show().addClass('active');
      }
    });
  }

  // Проверяем при загрузке страницы
  checkWidthAndInitCarousel();

  // Проверяем при изменении размера окна
  $(window).resize(function() {
    checkWidthAndInitCarousel();
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



  $('#phone-mask').mask('+7(999)999-99-99', {
    placeholder: "+7(___)___-__-__"
  });

});
