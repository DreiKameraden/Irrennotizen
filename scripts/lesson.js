// lesson.js — рендер урока по блокам

const params = new URLSearchParams(window.location.search);
const lessonId = params.get('id');

let quizPassed = true;
let renderFooterRef = null;

let lesson = null;
let parentCourse = null;

COURSES.forEach(function(course) {
  course.lessons.forEach(function(l) {
    if (l.id === lessonId) { lesson = l; parentCourse = course; }
  });
});

if (!lesson) {
  document.getElementById('lesson-content').innerHTML =
    '<p class="text-red-500">Урок не найден</p>';
} else {
  loadLesson();
}

async function loadLesson() {
  document.title = 'Урок ' + lesson.order + ': ' + lesson.title;
  renderHeader();

  const contentDiv = document.getElementById('lesson-content');
  contentDiv.innerHTML = '';

  const blocks = lesson.blocks || [];

  const hasQuiz = blocks.some(function(b) {
    return b.type === 'quiz' || b.type === 'map-quiz';
  });
  quizPassed = !hasQuiz;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    const wrap = document.createElement('div');
    wrap.className = 'lesson-block mb-10';
    contentDiv.appendChild(wrap);

    switch (block.type) {
      case 'markdown':
        await renderMarkdownBlock(wrap, block);
        break;
      case 'flashcards':
        renderFlashcards(wrap, block.cards);
        break;
      case 'fill-blank':
        renderFillBlank(wrap, block.items);
        break;
      case 'hotspots':
        renderHotspots(wrap, block.image, block.points);
        break;
      case 'matching':
        renderMatching(wrap, block.pairs);
        break;
      case 'map':
        await renderMap(wrap, block.map, block.lands);
        break;
      case 'map-quiz':
        await renderMapQuiz(wrap, block.map, block.targets, block.lands, function() {
          quizPassed = true;
          renderFooterRef && renderFooterRef();
        });
        break;
      case 'quiz':
        renderQuizBlock(wrap, block.questions, function() {
          quizPassed = true;
          renderFooterRef && renderFooterRef();
        });
        break;
    }
  }

  renderFooterRef = function() { renderFooter(quizPassed); };
  renderFooterRef();
}

function renderHeader() {
  document.getElementById('lesson-header').innerHTML =
    '<div class="flex justify-between items-center">' +
      '<div>' +
        '<div class="text-sm text-indigo-500 font-medium">' +
          parentCourse.title + ' · Урок ' + lesson.order +
        '</div>' +
        '<h1 class="text-3xl font-bold text-gray-800 mt-1">' + lesson.title + '</h1>' +
      '</div>' +
      '<div class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-bold text-lg">⭐ ' + lesson.xp + ' XP</div>' +
    '</div>';
}

async function renderMarkdownBlock(wrap, block) {
  if (block.content) {
    wrap.innerHTML = marked.parse(block.content);
    return;
  }
  if (!block.file) {
    wrap.innerHTML = '<p class="text-red-500">У markdown-блока нет ни content, ни file</p>';
    return;
  }
  wrap.innerHTML = '<p class="text-gray-500">Загрузка...</p>';
  try {
    const res = await fetch('lessons/' + block.file + '.md');
    if (!res.ok) throw new Error('Файл lessons/' + block.file + '.md не найден');
    wrap.innerHTML = marked.parse((await res.text()).replace(/^---[\s\S]*?---\n/, ''));
  } catch (e) {
    wrap.innerHTML = '<div class="p-4 bg-red-50 border border-red-200 rounded"><p class="text-red-700 font-bold">⚠️ ' + e.message + '</p></div>';
  }
}

function renderFooter(quizPassed) {
  const footer = document.getElementById('lesson-footer');

  if (progress.completed.includes(lesson.id)) {
    footer.innerHTML = '<div class="text-center p-4 bg-green-100 rounded-lg font-medium text-green-700">✓ Урок уже пройден</div>';
    return;
  }

  if (!quizPassed) {
    footer.innerHTML = '<div class="text-center p-4 bg-yellow-50 rounded-lg text-yellow-700">Пройди задание, чтобы завершить урок.</div>';
    return;
  }

  footer.innerHTML =
    '<button id="finish-btn" class="w-full py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 shadow-lg transition">' +
      '✅ Завершить урок (+' + lesson.xp + ' XP)' +
    '</button>';
  document.getElementById('finish-btn').onclick = function() {
    completeLesson(lesson, parentCourse);
  };
}