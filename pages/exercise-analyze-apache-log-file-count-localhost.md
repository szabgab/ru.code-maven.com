---
title: "Упражнение: Анализ лог-файла Apache - считаем localhost"
timestamp: 2016-02-27T20:33:01
tags:
  - exercises
  - projects
published: true
books:
  - ruby
  - python
  - javascript
  - php
author: szabgab
original: exercise-analyze-apache-log-file-count-localhost
translator: name2rnd
archive: true
---


В этом [упражнении](/exercises) мы берем файл лога, сгенерированный веб-сервером, и проводим простой анализ.


Файл выглядит вот так:

{% include file="examples/data/apache_access.log" %}

Каждая строка это запрос к веб-серверу. Что-то это страницы, что-то - изображения, что-то - файлы JavaScript.
Это сейчас не так важно. Сейчас мы собираемся сфокусироваться на первом элементе каждой строки, где указан IP-адрес хоста, откуда пришел запрос.
Делаем это с помощью простого упражнения.

Как вы, вероятно, знаете, каждое устройство использует IP-адрес 127.0.0.1 для ссылок на самого себя. Таким образом, запросы с этим 
IP-адресом пришли с этой же самой машины.

Задача написать скрипт, который посчитает запросы, пришедшие с 127.0.0.1 и остальные.

## Инструменты
* [Perl 5: open the file for reading or die](https://perlmaven.com/beginner-perl-maven-open-file)
* [Perl 5: chomp remove trailing newlines](https://perlmaven.com/chomp)
* [Perl 5: index](https://perlmaven.com/beginner-perl-maven-string-functions-index)
* [Perl 5: substr](https://perlmaven.com/beginner-perl-maven-substr)
* [Ruby: параметры командной строки ARGV](/argv-the-command-line-arguments-in-ruby).
* [Ruby: открытие файла на чтение и работа с ним](/open-file-and-read-content-in-ruby).

## Решения
* [Perl 5 - Analyze Apache log file - count localhost](https://perlmaven.com/beginner-perl-maven-analyze-apache-log-file)
* [Ruby - Анализ лог-файла Apache - считаем localhost](/analyze-apache-log-file-count-localhost-in-ruby)

