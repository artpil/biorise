$(document).ready(function() {

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
    center: true,
    items: 1,
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
        items: 1.1,
      }
    },
    onInitialized: function(event) {
      updateCounter(event, $slider);
    },
    onChanged: function(event) {
      updateCounter(event, $slider);
    }
  });

  $('#phone-mask').mask('+7(999)999-99-99', {
    placeholder: "+7(___)___-__-__"
  });

});
