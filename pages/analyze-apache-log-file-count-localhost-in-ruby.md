---
title: "Анализ лога Apache - считаем запросы с localhost на Ruby"
timestamp: 2016-02-27T20:10:01
tags:
  - index
  - substr
  - open
  - ARGV
published: true
books:
  - ruby
author: szabgab
original: analyze-apache-log-file-count-localhost-in-ruby
translator: name2rnd
archive: true
---


Было [упражнение](/exercise-analyze-apache-log-file-count-localhost), где нужно в файле логов веб-сервера Apache (или любого другого веб-сервера) посчитать,
сколько запросов пришло с локального хоста localhost (IP 127.0.0.1) и сколько из других мест.


Лог-файл выглядит вот так:

{% include file="examples/data/apache_access.log" %}

## Алгоритм:

Нам нужно два счетчика: один для подсчета хитов с 127.0.0.1 и один для хитов с других адресов.
Затем нужно пройтись по всем строкам, извлечь IP-адрес, и на его основе увеличить один из счетчиков.

Мы предполагаем, что программа будет использовать вот так: `ruby apache_localhost.rb  data/apache_access.log`.
Таким образом, мы предполагаем, что пользователь укажет имя файла с логом в качестве аргумента команды.

Тем не менее, в первых строках мы проверяем, передал ли пользователь вообще имя файла с помощью [количества элементов в ARGV](/argv-the-command-line-arguments-in-ruby). 
Если количество полученных аргументов не равно 1, то мы говорим пользователю, как пользоваться нашей программой и завершаем работу (`exit`).

Затем мы копируем имя файла из `ARGV` во внутреннюю переменную `filename`. В основном для наглядности кода.

Затем мы создаем два счетчика и устанавливаем их в 0.

Затем мы [открываем файл на чтение](/open-file-and-read-content-in-ruby) и читаем строку за строкой с помощью `each`.
В каждой итерации переменная `line` будет содержать текущую строку из файла.

IP-адрес это первое значение в строке до пробела.
Есть несколько способов получить это значение из строки. В этом случае мы используем метод `index` объекта `line`, передавая ему пробел.
Метод вернет позицию первого пробела в `line`. Так как нумерация начинается с 0, то этот номер будет также и длиной IP-адреса.
Поэтому мы записали полученный результат в переменную `length`.

Мы можем использовать эту переменную для извлечения подстроки из `line`, которая начинается с 0 и включает `length` символов.
Для этого нужно передать индекс начала подстроки и длину подстроки, которую мы хотим извлечь.
Это и будет IP-адрес из текущей строки.

Осталость только проверить, что полученное значение совпадает с 127.0.0.1 (localhost) и увеличить соответствующий счетчик.

{% include file="examples/ruby/apache_localhost.rb" %}

