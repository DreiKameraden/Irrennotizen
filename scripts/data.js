// data.js — данные курсов и уроков

window.COURSES = [
  {
    id: 'course-1',
    title: 'Немецкий язык',
    description: 'Лексика и грамматика',
    icon: '🇩🇪',
    lessons: [
      {
        id: 'de-1-1', order: 1, xp: 40,
        title: 'Приветствия', description: 'Учим приветствия по-немецки',
        blocks: [
          { type: 'markdown', file: 'lesson-1-1' },
          { type: 'flashcards', cards: [
            { front: 'Hallo', back: 'Привет' },
            { front: 'Guten Morgen', back: 'Доброе утро' },
            { front: 'Guten Tag', back: 'Добрый день' },
            { front: 'Guten Abend', back: 'Добрый вечер' },
            { front: 'Tschüss', back: 'Пока' },
            { front: 'Auf Wiedersehen', back: 'До свидания' }
          ]},
          { type: 'markdown', content: 'Теперь проверь себя.' },
          { type: 'quiz', questions: [
            { question: 'Как сказать «Доброе утро»?', options: ['Guten Abend', 'Guten Morgen', 'Gute Nacht'], correct: 1 }
          ]}
        ]
      },
      {
        id: 'de-1-2', order: 2, xp: 50,
        title: 'Артикли', description: 'der / die / das',
        blocks: [
          { type: 'markdown', content: '## Артикли\n\nВ немецком три артикля: **der**, **die**, **das**.' },
          { type: 'fill-blank', items: [
            { text: '___ Mann ist groß.', answer: 'Der' },
            { text: '___ Frau liest ein Buch.', answer: 'Die' },
            { text: '___ Kind spielt.', answer: 'Das' }
          ]}
        ]
      },
      {
        id: 'de-1-3', order: 3, xp: 50,
        title: 'Слова и перевод', description: 'Соедини пары',
        blocks: [
          { type: 'matching', pairs: [
            { left: 'der Hund', right: 'собака' },
            { left: 'die Katze', right: 'кошка' },
            { left: 'das Haus', right: 'дом' },
            { left: 'der Baum', right: 'дерево' }
          ]}
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Страноведение',
    description: 'Германия: земли, города, реки',
    icon: '🗺️',
    lessons: [
      {
        id: 'lk-1-1', order: 1, xp: 70,
        title: 'Земли Германии', description: 'Интерактивная карта',
        blocks: [
          { type: 'markdown', content: '## Земли Германии\n\nНаведи на землю — увидишь название. Нажми — узнаешь столицу.' },
          {
            type: 'map',
            map: 'germany',
            lands: {
              DEBW: { name: 'Баден-Вюртемберг',            capital: 'Штутгарт' },
              DEBY: { name: 'Бавария',                     capital: 'Мюнхен' },
              DEBE: { name: 'Берлин',                      capital: 'Берлин' },
              DEBB: { name: 'Бранденбург',                 capital: 'Потсдам' },
              DEHB: { name: 'Бремен',                      capital: 'Бремен' },
              DEHH: { name: 'Гамбург',                     capital: 'Гамбург' },
              DEHE: { name: 'Гессен',                      capital: 'Висбаден' },
              DEMV: { name: 'Мекленбург-Передняя Померания', capital: 'Шверин' },
              DENI: { name: 'Нижняя Саксония',             capital: 'Ганновер' },
              DENW: { name: 'Северный Рейн-Вестфалия',     capital: 'Дюссельдорф' },
              DERP: { name: 'Рейнланд-Пфальц',             capital: 'Майнц' },
              DESL: { name: 'Саар',                        capital: 'Саарбрюккен' },
              DESN: { name: 'Саксония',                    capital: 'Дрезден' },
              DEST: { name: 'Саксония-Анхальт',            capital: 'Магдебург' },
              DESH: { name: 'Шлезвиг-Гольштейн',           capital: 'Киль' },
              DETH: { name: 'Тюрингия',                    capital: 'Эрфурт' }
            }
          }
        ]
      },
      {
        id: 'lk-1-2', order: 2, xp: 100,
        title: 'Найди землю', description: 'Квиз по карте',
        blocks: [
          { type: 'markdown', content: '## Проверь себя\n\nНайди на карте нужные земли.' },
          {
            type: 'map-quiz',
            map: 'germany',
            targets: ['DEBY', 'DENW', 'DESN', 'DEBE', 'DEHH'],
            lands: {
              DEBW: { name: 'Баден-Вюртемберг',            capital: 'Штутгарт' },
              DEBY: { name: 'Бавария',                     capital: 'Мюнхен' },
              DEBE: { name: 'Берлин',                      capital: 'Берлин' },
              DEBB: { name: 'Бранденбург',                 capital: 'Потсдам' },
              DEHB: { name: 'Бремен',                      capital: 'Бремен' },
              DEHH: { name: 'Гамбург',                     capital: 'Гамбург' },
              DEHE: { name: 'Гессен',                      capital: 'Висбаден' },
              DEMV: { name: 'Мекленбург-Передняя Померания', capital: 'Шверин' },
              DENI: { name: 'Нижняя Саксония',             capital: 'Ганновер' },
              DENW: { name: 'Северный Рейн-Вестфалия',     capital: 'Дюссельдорф' },
              DERP: { name: 'Рейнланд-Пфальц',             capital: 'Майнц' },
              DESL: { name: 'Саар',                        capital: 'Саарбрюккен' },
              DESN: { name: 'Саксония',                    capital: 'Дрезден' },
              DEST: { name: 'Саксония-Анхальт',            capital: 'Магдебург' },
              DESH: { name: 'Шлезвиг-Гольштейн',           capital: 'Киль' },
              DETH: { name: 'Тюрингия',                    capital: 'Эрфурт' }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Культурология',
    description: 'Искусство и культура Германии',
    icon: '🎨',
    lessons: [
      {
        id: 'ku-1-1', order: 1, xp: 60,
        title: 'Баухаус', description: 'Ключевые точки',
        blocks: [
          { type: 'markdown', content: '## Баухаус\n\nНажми на точки, чтобы узнать подробности.' },
          { type: 'hotspots', image: 'images/bauhaus.jpg', points: [
            { x: 30, y: 40, title: 'Вальтер Гропиус', text: 'Основатель школы Баухаус в 1919 году.' },
            { x: 70, y: 60, title: 'Дессау', text: 'Второе здание школы, 1925–1926.' }
          ]}
        ]
      }
    ]
  }
];