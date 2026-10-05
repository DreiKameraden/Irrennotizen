---
title: "Урок 3: Циклы"
order: 3
xp: 70
---

# Циклы

Циклы повторяют код многократно.

## for

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

## while

```javascript
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}
```

## Перебор массивов

```javascript
for (let fruit of fruits) {
  console.log(fruit);
}
```

## Итог

- `for` — когда знаете количество
- `while` — пока условие истинно
- `break` — выход, `continue` — пропуск
