---
title: "Как завершить работу скрипта Node.js"
timestamp: 2015-02-11T14:22:01
tags:
  - process
  - exit
published: true
books:
  - nodejs
author: szabgab
translator: name2rnd
archive: true
---


Обычно скрипт для Node.js завершает работу при достижении конца программы и если не осталось активных обработчиков событий.
Что делать, если нужно завершить его работу раньше?


Это довольно просто.

У встроенного модуля [process](http://nodejs.org/api/process.html) есть метод [exit](http://nodejs.org/api/process.html#process_process_exit_code):

{% include file="examples/node/process_exit.js" %}

