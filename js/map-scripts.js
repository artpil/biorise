document.addEventListener("DOMContentLoaded", function () {
  let isYmapLoaded = false; // Флаг, чтобы проверить, загружена ли карта

  const loadYmapScript = () => {
    if (isYmapLoaded) return; // Если карта уже загружена, выходим из функции
    isYmapLoaded = true; // Устанавливаем флаг, что карта загружена

    loadScript(
      `https://api-maps.yandex.ru/2.1/?apikey=${ymapData.apikey}&suggest_apikey=${ymapData.apikeysuggest}&lang=ru_RU`,
      () => {
        window.dispatchEvent(new Event("loadedYmap")); // Отправляем событие один раз
      }
    );
  };
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadYmapScript(); // Загружаем скрипт при первом пересечении видимости
          observerInstance.unobserve(entry.target); // Прекращаем наблюдение за этим элементом
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1, // Запускать callback, когда элемент на 10% виден на экране
    }
  );

  // Глобальный объект для хранения экземпляров карт
  window.clinicMaps = window.clinicMaps || {};

  jQuery(function ($) {
    $(".js-router-map").each(function (index, element) {
      observer.observe(element); // Добавляем каждый элемент в наблюдение
    });

    $(window).on("loadedYmap", function () {
      $(".js-router-map").each(loadRouterMap);
    });

    function loadRouterMap(index) {
      const $this = $(this);

      $this.attr("id", "map-router-" + index);
      let id = $this.attr("id");

      let coords = $this.data("coords");
      let title = $this.data("title");
      let lng = null;
      let lat = null;

      if (coords !== undefined && coords !== "") {
        coords = splitCoords(coords);
        if (coords !== false) {
          lat = coords[0];
          lng = coords[1];
        }
      }
      if (lng === null || lat === null) {
        return false;
      }
      let zoom = $this.data("zoom") || 16;

      // Функция ymaps.ready() будет вызвана, когда
      // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
      ymaps.ready(function () {
        var myMaplocate = new ymaps.Map(
          id,
          {
            center: [lat, lng],
            // от 0 (весь мир) до 19.
            zoom: zoom,
            controls: [],
          },
          {
            // minZoom: 5
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          }
        );

        var myPlacemark = null;

        // Создаем точку если есть координаты
        myPlacemark = new ymaps.Placemark(
          [lat, lng],
          {
            iconImageHref: ymapData.home + "/assets/imgs/map/map-point.svg", // Путь к изображению иконки
            title: title || "", // Текст комментария
          },
          {
            iconLayout: ymaps.templateLayoutFactory.createClass(
              `<div class="ymap-main" style="display: flex; align-items: center;">
                <div style="display: flex; align-items: center; position:relative; z-index: 2;">
                    <img src="{{ properties.iconImageHref }}" class="ymap-main-icon" alt="icon" />
                  </div>
                  <div class="ymap-main-content">
                    <span class="ymap-main-title">{{ properties.title }}</span>
                   </div>
                </div>`
            ),
          }
        );
        myMaplocate.geoObjects.add(myPlacemark);

        var zoomControl = new ymaps.control.ZoomControl({
          options: {
            size: "small",
            position: {
              top: "var(--ymap-controll-zoom, 200px)",
              right: "4%",
            },
          },
        });
        myMaplocate.controls.add(zoomControl);
        myMaplocate.behaviors.disable("scrollZoom");
        myMaplocate.behaviors.enable("drag");

        // Сохраняем экземпляр карты в глобальный объект
        window.clinicMaps[id] = myMaplocate;
      });
    }
  });
});
