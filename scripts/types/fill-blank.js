function renderFillBlank(wrap, items) {
  let html = '<div class="max-w-2xl mx-auto space-y-4">';
  items.forEach(function(item, i) {
    html +=
      '<div class="p-4 bg-white border-2 border-gray-200 rounded-xl" data-fb="' + i + '">' +
        '<div class="text-lg text-gray-800 mb-3">' +
          item.text.replace('___', '<input type="text" data-idx="' + i + '" class="inline-block w-32 px-2 py-1 border-b-2 border-indigo-400 text-center font-bold text-indigo-600 bg-indigo-50 rounded">') +
        '</div>' +
        '<div class="text-sm result"></div>' +
      '</div>';
  });
  html += '<button class="fb-check w-full py-3 rounded-lg bg-indigo-500 text-white font-bold hover:bg-indigo-600 mt-4">Проверить</button>';
  html += '<div class="fb-summary text-center mt-3"></div></div>';

  wrap.innerHTML = html;

  wrap.querySelector('.fb-check').onclick = function() {
    let correct = 0;
    items.forEach(function(item, i) {
      const input = wrap.querySelector('input[data-idx="' + i + '"]');
      const res = wrap.querySelector('[data-fb="' + i + '"] .result');
      const val = (input.value || '').trim().toLowerCase();
      if (val === item.answer.toLowerCase()) {
        input.classList.add('border-green-500', 'text-green-700', 'bg-green-50');
        res.innerHTML = '<span class="text-green-600">✓ Верно</span>';
        correct++;
      } else {
        input.classList.add('border-red-500', 'text-red-700', 'bg-red-50');
        res.innerHTML = '<span class="text-red-600">✗ Правильно: <b>' + item.answer + '</b></span>';
      }
    });
    wrap.querySelector('.fb-summary').innerHTML = '<span class="font-bold">' + correct + ' / ' + items.length + '</span>';
  };
}