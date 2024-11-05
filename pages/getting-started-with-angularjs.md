---
title: "Начало работы с AngularJS"
timestamp: 2015-08-01T13:52:01
tags:
  - ng-app
  - "{{"
  - "}}"
published: true
books:
  - javascript
  - angularjs
author: szabgab
translator: name2rnd
original: getting-started-with-angularjs
archive: true
---


[AngularJS](https://angularjs.org/) это JavaScript фреймворк, который расширяет HTML.

Здесь мы рассмотрим несколько простых примеров использования AngularJS.
Для лучшего понимания, возможно, вы заходите взглянуть на [AngularJS Book](http://www.angularjsbook.com/)
от Chris Smith или [ng-book](https://www.ng-book.com/) от Ari Lerner.


Чтобы начать работу с AngularJS, нам нужна HTML страница с тремя вещами:

## 1) Загрузить angular.js

Нам нужно загрузить файл angular.js с одного из CDN или с локального диска.

Если вы хотите загрузить его с Google CDN, тогда добавьте в HTML такой код:

```
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
```

Если хотите использовать Cloudflare CDNjs, тогда такой:

```
<script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular.min.js"></script>
```

Также вы можете скачать файл angular.min.js, загрузить его на ваш сервер и подключить вот так:

```
<script src="angular.min.js"></script>
```

В примерах выше я использовал версию 1.4.2 AngularJS, но ко времени, когда вы будете читать эту статью,
у Angular может выйти новый релиз, и, возможно, вы захотите использовать новую версию.

## 2) Добавить ng-app

Добавьте `ng-app` к одному из элементов на вашей странице. Все, имеющее этот элемент, будет рассматриваться
как часть AngularJS кода. Мы можем добавить это к элементу `html`, `body`, 
или даже `div`, как это сделано в нашем первом примере.

## 3) Добавить выражение AngularJS.

AngularJS имеет различные элементы. Выражение (<b>expression</b>) это фрагмент кода, помещенный в
`{{ }}`. Он может содержать ограниченный набор выражений JavaScript.

Теперь мы подошли к нашему первому примеру. Еще даже до написания Hello

## Hello World с AngularJS

{% include file="examples/angular/hello_world.html" %}

[view](examples/angular/hello_world.html)

В нашем самом первом примере выражение это просто фиксированная строка. Ничего особенного.
Даже немного оскорбительно.

И результат - `Hello World`.

## Простое выражение AngularJS

В нашем следующем примере выражение это вычисление.

{% include file="examples/angular/first_expression.html" %}

[view](examples/angular/first_expression.html)

Результат - `Hello Angular 42`.

Angular выполнил выражение и показал результат.

Запомните, это работает в браузере, так что если вы нажмете "view source", то увидите 
этот код как и обычный html файл.

## Переменные в выражениях AngularJS

В следующем все еще очень простом примере, мы сможем увидеть, как можно присваивать значения переменным,
а затем мы сможем использовать эти переменные в выражениях.

Замечание: здесь мы не используем `var` для присвоения значений переменным, потому что
это на самом деле атрибуты внутреннего объекта AngularJS.

{% include file="examples/angular/variables_in_expressions.html" %}

[view](examples/angular/variables_in_expressions.html)

## Разделим установку переменной и ее использование на два выражения.

Мы можем даже присвоить значение переменной в одном выражении, а использовать ее в другом.
И не только. Даже расположение этих выражений в HTML не имеет значения.
Как мы можем выдеть в следующем примере, мы можем использовать переменную даже до ее установки:

{% include file="examples/angular/assignment_and_expression.html" %}

[view](examples/angular/assignment_and_expression.html)

Результатом будет:

```
Result 42
Assignment: 19
Result 42
```

Здесь есть некоторая проблема: последний результат выражения, в котором мы присваиваем значение, тоже отображается.
Вот поэтому мы видим 19 на странице.

Для решения проблемы можно добавить другой оператор к выражению присваивания,
который не будет возвращать видимого значения. Это может быть `null` или `''` (пустая строка).

{% include file="examples/angular/assignment_and_expression_fixed.html" %}

[view](examples/angular/assignment_and_expression_fixed.html)

Результатом будет:

```
Result 42
Assignment:
Result 42
```
