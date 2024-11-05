---
title: "Введение в Handlebars, шаблонизатор JavaScript"
timestamp: 2015-04-18T10:07:01
tags:
  - Handlebars
  - compile
  - template
published: true
books:
  - javascript
  - handlebars
author: szabgab
original: introduction-to-handlebars-javascript-templating-system
translator: name2rnd
archive: true
---


В статье про [ввод и вывод в JavaScript](/input-output-in-plain-javascript)
вы видели проблему создания сниппетов HTML на лету для последующего добавления на страницу.

[Handlebars](http://handlebarsjs.com/) это шаблонизатор для JavaScript, который помогает снизить
сложность создания таких страниц.

Давайте перепишем наш пример на использование Handlebars.


## Версия на чистом JavaScript

Этот пример из статьи [ввод и вывов в JavaScript](/input-output-in-plain-javascript):

{% include file="examples/js/pure_js_greating.html" %}

[view](examples/js/pure_js_greating.html)

## Переключение на Handlebars

Вот решение с использованием Handlebars:

{% include file="examples/js/handlebars_greating.html" %}

[view](examples/js/handlebars_greating.html)

Чтобы использовать Handlebars, нам нужно сначала загрузить библиотеку Handlebars. Мы можем использовать ее прямо с
[CDN JS](https://cdnjs.com/):

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.min.js"></script>
```

либо мы можем скачать этот файл к себе на сервер и загружать его оттуда.

Мы создаем сниппет HTML и расставляем плейсхолдеры в двойных фигурных скобках:

```
Hello <b>{{first_name}}</b> {{last_name}}
```

Мы можем описать шаблоны в HTML несколькими способами, но один из рекомендуемых способов
это включить его в блоке `head` HTML страницы внутри тегов `script` с уникальным `id`.
Таким образом мы легко можем описать несколько шаблонов. И намного понятнее, какой мы хотим видеть окончальтельную HTML страницу.

```
<script id="text-template" type="text/x-handlebars-template">
   Hello <b>{{first_name}}</b> {{last_name}}
</script>
```

Затем мы описываем JavaScript. В коде JavaScript мы заменяем нашу строку,
собирающую переменные и HTML, которая выглядит вот так:

```
var html = 'Hello <b>' + fname + '</b> ' + lname;
```

на новый код:

```
var source   = document.getElementById('text-template').innerHTML;
var template = Handlebars.compile(source);
var context = {first_name: fname, last_name: lname};
var html    = template(context);
```

Я знаю, что это выглядит сложнее, чем раньше, и в таком простом примере, где нам
нужно просто вставить содержимое двух переменных в простой сниппет HTML, это может быть
чрезмерно. Но когда ваше приложение будет расти, вы увидите, что сложность
решения на простом Javascript будет расти, в то же время сложность решения на Handlebar
останется примерно такой же.

Давайте пройдемся по тем 4 строкам.

В первой строке мы обращаемся к элементу с id `text-template`, где у нас лежит шаблон,
и, используя метод `innerHTML`, мы копируем содержимое элемента в переменную `source`.

Во второй строке мы компилируем шаблон и создаем объект Handlebars, используя метод `Handlebars.compile()`.
Вообще-то, метод `compile` возвращает функцию, которую мы вызовем позднее.

В третьей строке мы создаем ассоциативный массив с ключами, которые совпадают с плейсхолдерами в шаблоне. Значения этих ключей
заменят плейсхолдеры. В массиве находятся значения, которые мы получили из элементов `input`. 
Это просто обычный объект JavaScript. Ничего особенного.
(Вы можете называть это хэш, ассоциативный массив или словарь в зависимости от другого языка, с которым вы знакомы.)

И в конце мы говорим шаблону заменить плейсхолдеры предоставленными значениями и присвоить полученный результат переменной `html`.

После этого мы можем вернуться обратно к оставшемуся коду JavaScript, и добавить новый HTML в существующий DOM с помощью

```
document.getElementById('result').innerHTML = html;
```

Это были основы Handlebars. Если вы хотите узнать больше, ознакомьтесь с документацией на веб-сайте [Handlebars](http://handlebarsjs.com/)

