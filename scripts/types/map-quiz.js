// map-quiz.js — «найди землю на карте»
// Блок: { type: 'map-quiz', map: 'germany', targets: ['DEBY', ...], lands: {...} }

async function renderMapQuiz(wrap, mapId, targets, lands, onSuccess) {
  wrap.innerHTML = '<p class="text-gray-500">Загрузка карты...</p>';

  try {
    const res = await fetch('maps/' + mapId + '.svg');
    if (!res.ok) throw new Error('Файл maps/' + mapId + '.svg не найден');

    lands = lands || {};
    const queue = shuffle(targets.slice());
    let idx = 0;
    let mistakes = 0;

    wrap.innerHTML =
      '<div class="max-w-3xl mx-auto">' +
        '<div class="mb-4 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl text-center">' +
          '<div class="text-sm text-indigo-600 font-medium">Найди на карте:</div>' +
          '<div class="quiz-target text-2xl font-bold text-indigo-800 mt-1"></div>' +
          '<div class="quiz-counter text-sm text-gray-500 mt-2"></div>' +
        '</div>' +
        '<div class="relative">' +
          '<div class="map-svg">' + await res.text() + '</div>' +
        '</div>' +
        '<div class="quiz-done hidden mt-4 p-6 bg-green-50 border-2 border-green-200 rounded-xl text-center">' +
          '<div class="text-4xl mb-2">🎉</div>' +
          '<div class="text-xl font-bold text-green-700">Все земли найдены!</div>' +
          '<div class="text-green-600 mt-1 quiz-mistakes"></div>' +
        '</div>' +
      '</div>';

    const targetEl = wrap.querySelector('.quiz-target');
    const counterEl = wrap.querySelector('.quiz-counter');
    const doneEl = wrap.querySelector('.quiz-done');

    function updatePrompt() {
      if (idx >= queue.length) {
        targetEl.textContent = '';
        counterEl.textContent = '';
        doneEl.classList.remove('hidden');
        doneEl.querySelector('.quiz-mistakes').textContent =
          mistakes === 0 ? 'Без ошибок!' : 'Ошибок: ' + mistakes;
        if (typeof onSuccess === 'function') onSuccess();
        return;
      }
      const id = queue[idx];
      const meta = lands[id] || {};
      targetEl.textContent = meta.name || id;
      counterEl.textContent = (idx + 1) + ' / ' + queue.length;
    }

    wrap.querySelectorAll('.map-svg path[id]').forEach(function(path) {
      path.style.cursor = 'pointer';
      path.style.transition = 'fill 0.15s';

      path.addEventListener('mouseenter', function() {
        if (!path.hasAttribute('data-orig-fill')) {
          path.setAttribute('data-orig-fill', path.getAttribute('fill') || '');
        }
        path.setAttribute('fill', '#a5b4fc');
      });

      path.addEventListener('mouseleave', function() {
        const orig = path.getAttribute('data-orig-fill');
        if (orig) path.setAttribute('fill', orig);
        else path.removeAttribute('fill');
      });

      path.addEventListener('click', function() {
        if (idx >= queue.length) return;
        const id = path.getAttribute('id');
        const correctId = queue[idx];

        if (id === correctId) {
          path.setAttribute('fill', '#22c55e');
          path.setAttribute('data-orig-fill', '#22c55e');
          idx++;
          updatePrompt();
        } else {
          mistakes++;
          path.setAttribute('fill', '#ef4444');
          setTimeout(function() {
            path.removeAttribute('fill');
            path.removeAttribute('data-orig-fill');
          }, 500);
        }
      });
    });

    updatePrompt();
  } catch (e) {
    wrap.innerHTML = '<div class="p-4 bg-red-50 border border-red-200 rounded"><p class="text-red-700 font-bold">⚠️ ' + e.message + '</p></div>';
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}