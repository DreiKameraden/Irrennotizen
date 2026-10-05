---
title: "Урок 4: Функции"
order: 4
xp: 80
---

# Функции

Функция — переиспользуемый блок кода.

## Объявление

```javascript
function greet(name) {
  return "Привет, " + name;
}
```

## Стрелочные функции

```javascript
const double = (x) => x * 2;
```

## Параметры по умолчанию

```javascript
function power(base, exponent = 2) {
  return base ** exponent;
}
```

## Итог

- `function name() {}` — обычная
- `() => {}` — стрелочная
- Функции можно передавать как значения
