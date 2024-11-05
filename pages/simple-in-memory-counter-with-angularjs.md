---
title: "Простой in-memory счетчик с AngularJS"
timestamp: 2015-10-25T17:54:01
tags:
  - ng-app
  - ng-click
  - ng-init
published: true
books:
  - angularjs
  - javascript
original: simple-in-memory-counter-with-angularjs
translator: name2rnd
author: szabgab
archive: true
---


В статье [о примерах счетчиков](https://code-maven.com/counter) мы видели много вариантов реализации.
Вот один с использованием [AngularJS](/angularjs).


## Простая кнопка для увеличения счетчика

{% include file="examples/angular/in_memory_counter.html" %}

[view](examples/angular/in_memory_counter.html)

В этом примере у нас есть HTML кнопка с двумя Angular-атрибутами.
Содержимое атрибута `ng-init` будет выполнено один раз во время загрузки страницы. Он задает начальное значение атрибута `counter`.

Содержимое атрибута `ng-click` будет выполняться каждый раз во время нажатия кнопки. Он будет увеличить счетчик на 1.
(`counter++` здесь не работает)

Когда страница загружается, мы видим кнопку "Increment" и число 0. Как только мы нажмем на кнопку, число увеличится на 1.

## Кнопки для увеличения (инкремент) и уменьшения (декремент)

В следующем примере у нас есть новая кнопка - для уменьшения счетчика на 1.
К тому же, чтобы этот шаг сделать более явным, мы перенесли атрибут `ng-init`
в отдельный элемент `div`, который не отображается.

{% include file="examples/angular/in_memory_counter_with_decrement.html" %}

[view](examples/angular/in_memory_counter_with_decrement.html)

## In-memory счетчик с помощью контроллера

С целью подготовки к более сложным действиям в третьем примере мы перенесли код, уменьшающий счетчик, в контроллер.
(Кнопка, увеличивающая счетчик, осталась без изменений.)

В этот раз мы создали [модуль и контроллер Angular](/hello-world-with-angular-controller),
в котором установили значение по умолчанию для переменной `$scope.counter` в 0 и определили метод `decrement`.
Так как это уже чистый JavaScript, то мы можем делать автоинкремент и автодекремент с помощью выражения: `counter--`.

В HTML мы установили атрибут `ng-click="decrement()"`, который обозначает, что метод `decrement`
будет вызыван каждый раз, когда будет нажата кнопка.

{% include file="examples/angular/in_memory_counter_with_controller.html" %}

[view](examples/angular/in_memory_counter_with_controller.html)
