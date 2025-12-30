$(document).ready(function() {
  // Инициализация слайдера
  var $slider = $('.result__slider');
  $slider.owlCarousel({
    center: true,
    items: 1,
    autoWidth: false,
    loop: false,
    margin: 15,
    dots:false,
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