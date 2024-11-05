---
title: "Обработка пользовательских событий в JavaScript"
timestamp: 2015-04-12T16:44:01
tags:
  - addEventListener
  - click
published: true
books:
  - javascript
author: szabgab
original: handling-events-in-javascript
translator: name2rnd
archive: true
---


В прошлой статье мы видели, как [менять DOM](/javascript-hello-world-change-the-dom) и обновлять HTML страницу, 
но когда мы должны это делать? В предыдущем примере код, обновляющий HTML, запускался сразу же, как только страница загружалась в браузер.

В этот раз мы бы хотели отловить событие, сгенерированное пользователем - нажатие на кнопке, к примеру - и мы бы хотели 
обновить HTML страницу, когда это произойдет.


В Javascript мы можем присоединить (повесить) различные "event listeners" (обработчик события), 
к любому элементу DOM, и даже указать, на какое точно событие он должен реагировать.

Для этого мы можем использовать метод `addEventListener` элемента DOM, который получит два параметра. Первый - это 
имя события, такое как `click` или `keyup`, или `change`. Второй - функция.
(Возможно, мне бы стоило объяснить, как вы можете передать функцию как параметр в другую функцию.)

Вот полное выражение:

`document.getElementById('btn').addEventListener('click', clicked);`

Это значит что, как только браузер обнаруживает событие 'click' на HTML элементе с id 'btn', он будет выполнять функцию 'clicked'.

Что делает функция 'clicked'?

Она меняет DOM (HTML), вставляя текст 'Hello World' в элемент с id 'display'. Эта операция была рассмотрена в статье про 
[изменение DOM](/javascript-hello-world-change-the-dom).

Попробуйте пример, нажав на ссылку `Try`.

{% include file="examples/js/event_listener.html" %}

[view](examples/js/event_listener.html)
