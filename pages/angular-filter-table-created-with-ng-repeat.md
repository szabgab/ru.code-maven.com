---
title: "AngularJS: фильтрация таблиц с ng-repeat"
timestamp: 2016-02-28T18:18:25
tags:
  - ng-repeat
  - filter
  - ng-model
  - ng-change
published: true
books:
  - angularjs
original: angular-filter-table-created-with-ng-repeat
translator: name2rnd
author: szabgab
---


Создание таблицы с помощью `ng-repeat` весьма простое. Добавление поискового блока для фильтрации результатов тоже простое, но только
если вы хотите использовать простой поиск по тексту. Немного сложнее, если вы хотите искать по значениям <b>меньше, чем</b> введенное пользователем.


В нашем примере мы будем использовать [планеты Солнечной Системы](https://en.wikipedia.org/wiki/Solar_System).
У нас есть имя, средняя дистанция от Солнца в единицах "дистанция от Земли до Солнца" и масса относительно массы Земли.
Таким образом, оба значения равны 1 для Земли. (Земля это не центр системы, если что :).

В первом примере мы сделали таблицу из данных, прописанных в коде, и добавили текстовый фильтр на все поля:

{% include file="examples/angular/angular_table_filter_1.html" %}

[view](examples/angular/angular_table_filter_1.html)

Интересная часть кода кроется в этих двух строках:

{% include file="examples/angular/angular_table_filter_1.js" %}

Вторая строка это то, что строит таблицу. Это обычная `ng-repeat` строка, но результаты фильтруются
на основе содержимого объекта `f`. Атрибуты этого объекта связаны в полем ввода в первой строке.
Каждый атрибут будет фильтроваться в соответствии с полем исходного массива.

Хотя в нашем случае фильтр имеет смысл только для первой колонки. 
Так как это простой текст-фильтр, то как-то бессмысленно искать все планеты, у которых значение дистанции содержит 7.
В других таблицах, вероятно, это интереснее.

## Поиск значений больше или меньше

Гораздо интереснее найти все планеты, дистанция до которых меньше 2.
Или где масса меньше 20.

{% include file="examples/angular/angular_table_filter_2.html" %}

[view](examples/angular/angular_table_filter_2.html)

Это сильно сложнее. Я пока не смог найти решения лучше, так что сейчас каждый раз, когда пользователь вводит значение либо в поле "distance",
либо в поле "mass", код будет проходить по всем значениям массива и добавлять дополнительный ключ к каждому объекту со значениями `true`,
если объект подходит под условие, или `false`, если не подходит. Дополнительный ключ сделан с помощью добавления двух подчеркиваний '__' перед именем исходного ключа.
Предполагается, что мы вряд ли столкнемся с данными, где будут такие ключи.

HTML-код поменялся незначительно. Вместо привязки поля ввода к атрибуту объекта фильтра, мы привяжем его к другому объекту (с именем g), а также 
добавим вызов функции, используя `ng-change`.

{% include file="examples/angular/angular_table_filter_2b.js" %}

Когда пользователь поменяет значение в одном из двух полей, Angular вызовет функцию `filter_by`. Для начала мы проверим, не пусто ли поле ввода.
Если пусто, то удалим все наши созданные ключи.

Если в поле будет введено значение, мы пройдемся по всем объектам в массиве `planets` и добавим соответствующий атрибут со значением `true`
или `false`. Реальная фильтрация уже будет произведена AngularJS.

{% include file="examples/angular/angular_table_filter_2.js" %}

