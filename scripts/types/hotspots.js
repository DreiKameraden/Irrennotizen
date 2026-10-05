function renderHotspots(wrap, image, points) {
  let html = '<div class="relative max-w-3xl mx-auto">' +
    '<img src="' + image + '" class="w-full rounded-xl shadow" alt="">';
  points.forEach(function(p, i) {
    html +=
      '<button class="hs-dot absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-indigo-500 text-white font-bold border-2 border-white shadow-lg hover:scale-110 transition" ' +
        'style="left:' + p.x + '%;top:' + p.y + '%" data-i="' + i + '">' + (i + 1) + '</button>';
  });
  html += '</div>';
  html += '<div class="hs-info mt-6 max-w-3xl mx-auto p-6 bg-white border-2 border-indigo-200 rounded-xl hidden"></div>';

  wrap.innerHTML = html;

  wrap.querySelectorAll('.hs-dot').forEach(function(btn) {
    btn.onclick = function() {
      const p = points[parseInt(btn.dataset.i)];
      const info = wrap.querySelector('.hs-info');
      info.classList.remove('hidden');
      info.innerHTML = '<h3 class="text-xl font-bold text-gray-800">' + p.title + '</h3>' +
                       '<p class="text-gray-600 mt-2">' + p.text + '</p>';
    };
  });
}