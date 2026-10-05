function renderMatching(wrap, pairs) {
  const right = pairs.map(function(p, i) { return { text: p.right, i: i }; });

  for (let i = right.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [right[i], right[j]] = [right[j], right[i]];
  }

  let selectedLeft = null;
  const solved = new Set();

  function draw() {
    let html = '<div class="grid grid-cols-2 gap-4 max-w-2xl mx-auto">';
    html += '<div class="space-y-3">';
    pairs.forEach(function(p, i) {
      const done = solved.has(i);
      html += '<button class="match-left w-full p-4 rounded-lg border-2 text-left font-medium transition ' +
        (done ? 'border-green-400 bg-green-50 text-green-700'
              : (selectedLeft === i ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:border-indigo-300')) +
        '" data-i="' + i + '">' + p.left + '</button>';
    });
    html += '</div><div class="space-y-3">';
    right.forEach(function(item) {
      const done = solved.has(item.i);
      html += '<button class="match-right w-full p-4 rounded-lg border-2 text-left font-medium transition ' +
        (done ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-200 bg-white hover:border-indigo-300') +
        '" data-i="' + item.i + '">' + item.text + '</button>';
    });
    html += '</div></div>';

    if (solved.size === pairs.length) {
      html += '<div class="text-center mt-6 p-4 bg-green-50 rounded-lg text-green-700 font-bold">✓ Всё верно!</div>';
    }
    wrap.innerHTML = html;

    wrap.querySelectorAll('.match-left').forEach(function(btn) {
      btn.onclick = function() {
        const i = parseInt(btn.dataset.i);
        if (solved.has(i)) return;
        selectedLeft = (selectedLeft === i ? null : i);
        draw();
      };
    });
    wrap.querySelectorAll('.match-right').forEach(function(btn) {
      btn.onclick = function() {
        const i = parseInt(btn.dataset.i);
        if (solved.has(i) || selectedLeft === null) return;
        if (selectedLeft === i) { solved.add(i); selectedLeft = null; draw(); }
        else {
          btn.classList.add('border-red-400', 'bg-red-50');
          setTimeout(function() { btn.classList.remove('border-red-400', 'bg-red-50'); }, 400);
        }
      };
    });
  }
  draw();
}