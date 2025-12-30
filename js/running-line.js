$(document).ready(function() {
  // Инициализация бегущих строк
  $('[data-running-text]').each(function() {
    const $container = $(this);
    const originalContent = $container.html().trim();

    // Получаем настройки из data-атрибутов
    const copies = $container.data('copies') || 3;
    const speed = $container.data('speed') || 50;
    const direction = $container.data('direction') || 'left';
    const pauseOnHover = $container.data('pause-on-hover') !== false;

    // Очищаем контейнер
    $container.empty().css({
      overflow: 'hidden',
      position: 'relative',
      whiteSpace: 'nowrap'
    });

    // Создаем обертку
    const $wrapper = $('<div>').css({
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap'
    });

    // Создаем контент
    const $content = $('<div>').css({
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      whiteSpace: 'nowrap'

    });

    // Добавляем копии контента
    let fullContent = '';
    for (let i = 0; i < copies; i++) {
      fullContent += originalContent;
    }

    // Дублируем для плавности
    $content.html(fullContent + fullContent);

    // Собираем структуру
    $wrapper.append($content);
    $container.append($wrapper);

    // Рассчитываем анимацию
    const contentWidth = $content[0].scrollWidth / 2;
    const duration = contentWidth / speed;

    // Создаем уникальное имя анимации
    const animationName = 'marquee-' + Math.random().toString(36).substr(2, 9);

    // Добавляем стили анимации
    $('<style>')
      .text(`
        @keyframes ${animationName} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${contentWidth}px); }
        }
      `)
      .appendTo('head');

    // Применяем анимацию
    $content.css({
      animation: `${animationName} ${duration}s linear infinite`,
      animationPlayState: 'running'
    });

    // Пауза при наведении
    // if (pauseOnHover) {
    //   $container
    //     .on('mouseenter', function() {
    //       $content.css('animation-play-state', 'paused');
    //     })
    //     .on('mouseleave', function() {
    //       $content.css('animation-play-state', 'running');
    //     });
    // }

    // Обработка ресайза
    let resizeTimer;
    $(window).on('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        $container.trigger('rebuild');
      }, 250);
    });
  });
});