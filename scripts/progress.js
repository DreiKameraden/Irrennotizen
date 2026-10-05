// progress.js — XP, достижения, localStorage

// ---------- Прогресс ----------
let progress = JSON.parse(localStorage.getItem('progress') || '{}');
if (!progress.completed) {
  progress = { completed: [], xp: 0, achievements: [] };
}

function saveProgress() {
  localStorage.setItem('progress', JSON.stringify(progress));
}

function updateHeader() {
  const xpEl = document.getElementById('xp');
  const achEl = document.getElementById('ach-count');
  const barEl = document.getElementById('progress-bar');

  if (xpEl) xpEl.textContent = progress.xp;
  if (achEl) achEl.textContent = progress.achievements.length;

  if (barEl && typeof COURSES !== 'undefined') {
    const all = [];
    COURSES.forEach(function(c) { c.lessons.forEach(function(l) { all.push(l); }); });
    const done = all.filter(function(l) { return progress.completed.includes(l.id); }).length;
    const percent = all.length ? Math.round((done / all.length) * 100) : 0;
    barEl.style.width = percent + '%';
  }
}

function completeLesson(lesson, parentCourse) {
  if (!lesson || progress.completed.includes(lesson.id)) return;

  progress.completed.push(lesson.id);
  progress.xp += lesson.xp;

  const newAch = [];
  if (progress.completed.length === 1 && !progress.achievements.includes('first')) {
    progress.achievements.push('first'); newAch.push('🎯 Первый урок!');
  }
  if (progress.completed.length === 3 && !progress.achievements.includes('three')) {
    progress.achievements.push('three'); newAch.push('🚀 3 урока пройдено!');
  }
  if (progress.completed.length === 5 && !progress.achievements.includes('all')) {
    progress.achievements.push('all'); newAch.push('👑 Все уроки пройдены!');
  }

  saveProgress();
  updateHeader();

  if (newAch.length > 0) alert('Достижения:\n\n' + newAch.join('\n'));

  document.getElementById('lesson-footer').innerHTML =
    '<div class="text-center p-8 bg-green-100 rounded-lg">' +
      '<div class="text-6xl mb-3">🎉</div>' +
      '<h2 class="text-3xl font-bold text-green-700 mb-2">Урок завершён!</h2>' +
      '<p class="text-green-600 text-xl mb-6">+' + lesson.xp + ' XP заработано!</p>' +
      '<a href="course.html?id=' + parentCourse.id + '" class="inline-block px-8 py-3 bg-indigo-500 text-white rounded-lg font-bold hover:bg-indigo-600 transition">← Вернуться к курсу</a>' +
    '</div>';
}