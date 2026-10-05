// map.js — универсальная интерактивная SVG-карта
// Lands приходят из блока: { map: 'germany', lands: { DEBY: {...}, ... } }

async function renderMap(wrap, mapId, lands) {
  wrap.innerHTML = '<p class="text-gray-500">Загрузка карты...</p>';

  try {
    const res = await fetch('maps/' + mapId + '.svg');
    if (!res.ok) throw new Error('Файл maps/' + mapId + '.svg не найден');

    wrap.innerHTML =
      '<div class="relative">' +
        '<div class="map-svg">' + await res.text() + '</div>' +
        '<div class="map-info absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg hidden max-w-xs"></div>' +
        '<div class="map-tooltip absolute pointer-events-none bg-gray-900 text-white text-sm px-3 py-1 rounded shadow-lg hidden"></div>' +
      '</div>';

    const info = wrap.querySelector('.map-info');
    const tooltip = wrap.querySelector('.map-tooltip');
    const container = wrap.querySelector('.relative');

    lands = lands || {};

    wrap.querySelectorAll('.map-svg path[id]').forEach(function(path) {
      const id = path.getAttribute('id');
      const meta = lands[id] || {};
      const name = meta.name || path.getAttribute('name') || '';

      path.style.cursor = 'pointer';
      path.style.transition = 'fill 0.15s';

      path.addEventListener('mouseenter', function() {
        if (!path.hasAttribute('data-orig-fill')) {
          path.setAttribute('data-orig-fill', path.getAttribute('fill') || '');
        }
        path.setAttribute('fill', '#818cf8');
        if (name) {
          tooltip.textContent = name;
          tooltip.classList.remove('hidden');
        }
      });

      path.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
        tooltip.style.top  = (e.clientY - rect.top - 8) + 'px';
      });

      path.addEventListener('mouseleave', function() {
        const orig = path.getAttribute('data-orig-fill');
        if (orig) path.setAttribute('fill', orig);
        else path.removeAttribute('fill');
        tooltip.classList.add('hidden');
      });

      path.addEventListener('click', function() {
        info.classList.remove('hidden');
        info.innerHTML =
          '<h3 class="font-bold text-lg text-gray-800">' + name + '</h3>' +
          (meta.capital ? '<p class="text-gray-600 text-sm">Столица: ' + meta.capital + '</p>' : '');
      });
    });
  } catch (e) {
    wrap.innerHTML = '<div class="p-4 bg-red-50 border border-red-200 rounded"><p class="text-red-700 font-bold">⚠️ ' + e.message + '</p></div>';
  }
}