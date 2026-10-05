---
title: "Урок 5: Массивы"
order: 5
xp: 90
---

# Массивы

Массив — упорядоченная коллекция элементов.

## Создание

```javascript
let fruits = ["яблоко", "банан", "вишня"];
```

## Методы

```javascript
fruits.push("манго");   // добавить в конец
fruits.pop();           // убрать с конца
fruits.length;          // длина
```

## Перебор

```javascript
// map — преобразовать
let doubled = [1,2,3].map(n => n * 2); // [2, 4, 6]

// filter — отфильтровать
let evens = [1,2,3,4].filter(n => n % 2 === 0); // [2, 4]

// reduce — свернуть
let sum = [1,2,3].reduce((acc, n) => acc + n, 0); // 6
```

## Итог

- Индексация с 0
- `map`, `filter`, `reduce` — мощные методы
