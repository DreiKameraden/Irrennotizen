// ============================================
// site.js — логика главной и страницы курса
// Данные курсов — в data.js
// ============================================

function getAllLessons() {
  const all = [];
  COURSES.forEach(function(course) {
    course.lessons.forEach(function(lesson) {
      all.push(lesson);
    });
  });
  return all;
}

function countDoneLessons(lessons) {
  return lessons.filter(function(l) {
    return progress.completed.includes(l.id);
  }).length;
}

// ---------- Главная: список курсов ----------
function renderCourses() {
  const list = document.getElementById('courses-list');
  if (!list) return;

  list.innerHTML = '';

  COURSES.forEach(function(course) {
    const total = course.lessons.length;
    const doneCount = countDoneLessons(course.lessons);
    const percent = total ? Math.round((doneCount / total) * 100) : 0;

    const card = document.createElement('a');
    card.href = 'course.html?id=' + course.id;
    card.className = 'block p-5 rounded-xl border-2 transition ' + (
      doneCount === total && total > 0
        ? 'border-green-300 bg-green-50 hover:bg-green-100'
        : 'border-indigo-200 bg-white hover:border-indigo-400 hover:shadow-md'
    );

    card.innerHTML =
      '<div class="flex items-center gap-4">' +
        '<div class="text-4xl flex-shrink-0">' + course.icon + '</div>' +
        '<div class="flex-1 min-w-0">' +
          '<h3 class="font-bold text-xl text-gray-800">' + course.title + '</h3>' +
          '<p class="text-gray-500 mt-1">' + course.description + '</p>' +
          '<div class="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">' +
            '<div class="h-full bg-indigo-500 transition-all" style="width:' + percent + '%"></div>' +
          '</div>' +
        '</div>' +
        '<div class="text-right flex-shrink-0">' +
          '<div class="text-sm text-gray-500">' + doneCount + '/' + total + '</div>' +
          '<div class="text-xs text-gray-400 mt-1">уроков</div>' +
        '</div>' +
      '</div>';

    list.appendChild(card);
  });
}

// ---------- Страница курса: список уроков ----------
function renderCoursePage() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('id');
  const course = COURSES.find(function(c) { return c.id === courseId; });

  const titleEl = document.getElementById('course-title');
  const descEl = document.getElementById('course-description');

  if (!course) {
    document.body.innerHTML =
      '<div class="p-8 text-center text-gray-500">Курс не найден</div>';
    return;
  }

  if (titleEl) titleEl.textContent = course.title;
  if (descEl) descEl.textContent = course.description;

  const list = document.getElementById('lessons-list');
  if (!list) return;
  list.innerHTML = '';

  course.lessons.forEach(function(lesson, index) {
    const done = progress.completed.includes(lesson.id);
    const locked =
      index > 0 && !progress.completed.includes(course.lessons[index - 1].id);

    const card = document.createElement('a');
    card.href = locked ? '#' : 'lesson.html?id=' + lesson.id;
    card.className = 'block p-5 rounded-xl border-2 transition ' + (
      done ? 'border-green-300 bg-green-50 hover:bg-green-100'
        : locked ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
          : 'border-indigo-200 bg-white hover:border-indigo-400 hover:shadow-md'
    );

    if (locked) card.onclick = function(e) { e.preventDefault(); };

    card.innerHTML =
      '<div class="flex items-center gap-4">' +
        '<div class="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 ' + (
          done ? 'bg-green-500 text-white'
            : locked ? 'bg-gray-300 text-gray-500'
              : 'bg-indigo-500 text-white'
        ) + '">' + (done ? '✓' : locked ? '🔒' : lesson.order) + '</div>' +
        '<div class="flex-1">' +
          '<h3 class="font-bold text-xl text-gray-800">Урок ' + lesson.order + ': ' + lesson.title + '</h3>' +
          '<p class="text-gray-500 mt-1">' + lesson.description + '</p>' +
        '</div>' +
        '<div class="text-right flex-shrink-0">' +
          '<div class="text-yellow-500 font-bold text-lg">⭐ ' + lesson.xp + ' XP</div>' +
          (done ? '<div class="text-xs text-green-600 mt-1">Пройдено ✓</div>' : '') +
        '</div>' +
      '</div>';

    list.appendChild(card);
  });
}

// ---------- Сброс ----------
function resetProgress() {
  if (confirm('Сбросить весь прогресс?')) {
    progress = { completed: [], xp: 0, achievements: [] };
    saveProgress();
    updateHeader();
    if (document.getElementById('courses-list')) renderCourses();
    if (document.getElementById('lessons-list')) renderCoursePage();
  }
}

// ---------- Автозапуск ----------
updateHeader();

if (document.getElementById('courses-list')) {
  renderCourses();
} else if (document.getElementById('lessons-list')) {
  renderCoursePage();
}