---
title: "Сложение чисел с AngularJS"
timestamp: 2015-10-11T17:30:01
tags:
  - ng-controller
  - ng-model
published: true
books:
  - angularjs
  - javascript
author: szabgab
translator: name2rnd
original: add-numbers-with-angular
archive: true
---


После написания самого простого примера, я захотел создать небольшой калькулятор с помощью Angular. 
Это один из наиболее простых примеров кода, которые я могу представить после "Hello World" и "Echo".

Так что я решил создать страницу с помощью [AngularJS](/angularjs), которая сложит два числа.


## Наивный подход

Наивным решением, которое не сработало, было создать два элемента `input` с `ng-model` 'a' и 'b',
и затем написать выражение, складывающее эти два значения.

{% include file="examples/angular/add.html" %}

[view](examples/angular/add.html)

К сожалению, JavaScript, а следовательно и Angular, обрабатывают введенные значения как строки, 
даже если это на самом деле числа. Поэтому использование оператора `+` для строк приводит к их конкатенации.
Следовательно, если мы попробуем пример выше и введем в поля 2 и 3, то получим в результате 23.

## Сложение чисел с помощью контролллера

Сначала, как мы делали в примере [Hello World](/hello-world-with-angular-controller),
мы [создали модуль и контроллер](/hello-world-with-angular-controller).
Внутри контроллера мы создали функцию `AddNumbers`, связанную со `$scope`.
В той функции мы получаем значения для двух элементов `input` и преобразовываем их
в `Number` с помощью вызова функции JavaScript. (Чтобы избежать использования значения `undefined`,
мы присваиваем значение по умолчанию равное 0.) 
Затем мы суммируем значения и присваиваем полученное к созданному атрибуту `sum`.

{% include file="examples/angular/add_numbers_controller.js" %}

Затем в HTML мы можем использовать этот атрибут `sum` как часть простого выражения.
Для вызова функции `AddNumbers`, мы также добавили атрибут `ng-keyup` к обоим элементам `input`:

{% include file="examples/angular/add_numbers_controller.html" %}

[view](examples/angular/add_numbers_controller.html)

Попробуйте! Это великолепно работает!

Пока я это писал, подумал, что должно быть более простое решение, так как такой способ выглядит слишком сложным.
И в самом деле, более простое решение существует.

## Сложение чисел

Как оказалось, достаточно просто указать Angular, чтобы он оперировал со значениями, как с числами.
Мы просто добавляем `type="number"` к каждому элементу `input`:

{% include file="examples/angular/add_numbers.html" %}

[view](examples/angular/add_numbers.html)
