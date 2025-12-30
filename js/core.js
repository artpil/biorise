$(document).ready(function () {
  $('.result__slider').owlCarousel({
    center: true,
    items: 1,
    autoWidth: false,
    loop: true,
    margin: 15,
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
    }
  });
});




