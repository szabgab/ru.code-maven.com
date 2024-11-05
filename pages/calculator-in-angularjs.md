---
title: "Простой калькулятор на AngularJS"
timestamp: 2015-10-25T19:02:01
tags:
  - ng-app
  - ng-controller
  - ng-model
published: true
books:
  - angularjs
  - javascript
author: szabgab
translator: name2rnd
original: calculator-in-angularjs
archive: true
---


Не так давно я сделал пример про [сложение чисел на AngularJS](/add-numbers-with-angular).
В этой статье мы создадим простой калькулятор на AngularJS.


Если вы следили за [предыдущими статьями](/angularjs), тогда вы увидите, что в этот раз
я разделил HTML и JavaScript.

## HTML

Вы также увидите, что HTML все еще очень прост, хотя он содержит новый элемент.
В этом примере объявления `ng-app` и `ng-controller` находятся
в одном и том же элементе HTML. Зачем создавать дополнительный слой, если
мы можем это все сделать в одном элементе `div`?

Кроме того у нас есть два элемента `input` и один `select`.
Каждый из них имеет свой собственный атрибут `ng-model`.

Последняя часть HTML это директива `{{ result() }}`.
Думаю, это первый раз, когда у нас в директиве указан вызов функции.

{% include file="examples/angular/calculator.html" %}

[view](examples/angular/calculator.html)

## JavaScript

В JavaScript мы создали `модуль и контроллер Angular` и
описали функцию `result` как атрибут текущего `$scope`.
Именно это позволяет использовать функции в директивах Angular внутри HTML.

JavaScript считает результат простых операций, там все очевидно, хотя и немного скучно.

{% include file="examples/angular/calculator.js" %}
