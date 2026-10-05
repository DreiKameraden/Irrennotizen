// quiz.js — квиз внутри блока
function renderQuizBlock(wrap, questions, onSuccess) {
  let html = '<div class="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-gray-200">';
  html += '<h2 class="text-xl font-bold text-gray-800 mb-4">🧠 Проверь себя</h2>';

  questions.forEach(function(q, qi) {
    html += '<div class="mb-6">';
    html += '<p class="font-medium text-gray-800 mb-2">' + (qi + 1) + '. ' + q.question + '</p>';
    q.options.forEach(function(opt, oi) {
      html +=
        '<label class="block p-3 mb-2 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-indigo-300 transition">' +
          '<input type="radio" name="quiz_' + qi + '" value="' + oi + '" class="mr-2">' + opt +
        '</label>';
    });
    html += '</div>';
  });

  html += '<button class="quiz-check w-full py-3 bg-indigo-500 text-white rounded-lg font-bold hover:bg-indigo-600 transition">Проверить</button>';
  html += '<div class="quiz-result mt-4"></div>';
  html += '</div>';

  wrap.innerHTML = html;

  wrap.querySelector('.quiz-check').onclick = function() {
    let allCorrect = true, answeredAll = true;

    questions.forEach(function(q, qi) {
      const sel = wrap.querySelector('input[name="quiz_' + qi + '"]:checked');
      if (!sel) { answeredAll = false; return; }
      if (parseInt(sel.value) !== q.correct) allCorrect = false;
    });

    const result = wrap.querySelector('.quiz-result');

    if (!answeredAll) { result.innerHTML = '<p class="text-yellow-600">Ответь на все вопросы.</p>'; return; }
    if (!allCorrect)  { result.innerHTML = '<p class="text-red-600">❌ Есть ошибки. Попробуй ещё раз.</p>'; return; }

    result.innerHTML = '<p class="text-green-600 font-bold">✅ Верно!</p>';
    onSuccess();
  };
}