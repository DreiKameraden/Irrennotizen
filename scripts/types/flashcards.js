function renderFlashcards(wrap, cards) {
  let idx = 0, flipped = false;

  function draw() {
    const c = cards[idx];
    wrap.innerHTML =
      '<div class="max-w-xl mx-auto">' +
        '<div class="text-center text-sm text-gray-500 mb-3">' + (idx + 1) + ' / ' + cards.length + '</div>' +
        '<div class="fc-card cursor-pointer bg-white border-2 border-indigo-200 rounded-2xl p-12 text-center shadow-lg min-h-[220px] flex items-center justify-center">' +
          '<div class="text-3xl font-bold text-gray-800">' + (flipped ? c.back : c.front) + '</div>' +
        '</div>' +
        '<div class="flex gap-3 mt-6">' +
          '<button class="fc-prev flex-1 py-3 rounded-lg border-2 border-gray-200 font-bold hover:bg-gray-50">←</button>' +
        //   '<button class="fc-flip flex-1 py-3 rounded-lg bg-indigo-500 text-white font-bold hover:bg-indigo-600">Перевернуть</button>' +
          '<button class="fc-next flex-1 py-3 rounded-lg border-2 border-gray-200 font-bold hover:bg-gray-50">→</button>' +
        '</div>' +
      '</div>';

    wrap.querySelector('.fc-card').onclick = function() { flipped = !flipped; draw(); };
    wrap.querySelector('.fc-prev').onclick = function() { if (idx > 0) { idx--; flipped = false; draw(); } };
    wrap.querySelector('.fc-next').onclick = function() { if (idx < cards.length - 1) { idx++; flipped = false; draw(); } };
  }
  draw();
}