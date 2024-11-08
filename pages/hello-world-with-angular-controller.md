---
title: "Hello World с модулем AngularJS и контроллером"
timestamp: 2015-09-06T16:48:01
tags:
  - ng-app
  - ng-controller
  - angular.module
  - controller
  - $scope
published: true
books:
  - angularjs
  - javascript
author: szabgab
translator: name2rnd
original: hello-world-with-angular-controller
archive: true
---


В статье про [начало работы с AngularJS](/getting-started-with-angularjs) мы видели, как работают простые выражения,
затем мы создали нашу [первую связку](/angularjs-first-binding). В этот раз мы рассмотрим два примера,
используя модуль AngularJS и контроллеры.


## Контроллер Hello World

{% include file="examples/angular/hello_world_controller.html" %}

[view](examples/angular/hello_world_controller.html)

После загрузки `angular.js` мы добавили еще немного кода JavaScript.
Мы можем встроить это в HTML-файл, используя парный тег `script` или,
как рекомендовано и как мы делаем в этом примере, мы можем поместить этот код во внешний JavaScript файл.
Единственное требование - мы загружаем его `после` загрузки `angular.js`.

Код JavaScript выглядит так:

{% include file="examples/angular/hello_world_controller.js" %}
Сначала мы создаем объект `angular.module`, а вслед за этим создаем `controller`.
`Module` принимает два параметра: первый это имя, которое мы выбрали для этого модуля.
Это может быть любая строка, но так как это имя приложения Angular, так что хорошо бы назвать это как-то с "App".

Мы собираемся использовать это имя в HTML файле как значение атрибута `ng-app`.
(Раньше мы не указывали имя для этого атрибута, поэтому использовалось приложение по умолчанию)

Второй параметр для `module` это список зависимостей. Сейчас мы оставим его пустым.

`Controller` также имеет два параметра. Первый - это его имя. Обычно это какое-нибудь слово,
оканчивающееся на "Controller". Второй параметр это функция, реализующая контроллер.
Она будет выполнена сразу как загрузится контроллер. Окружение передается в переменной `$scope`.
Модели и переменные, которые мы использовали ранее, это атрибуты этого объекта.
Теперь когда мы создали новый атрубут `$scope.greeting` и присвоили ему значение,
мы сможем получить доступ к нему из нашего HTML.

Чтобы подключиться к нашему модулю и контроллеру мы должны создать HTML элемент
с атрибутом `ng-app`, содержащим имя нашего модуля, и внутри этого элемента 
мы должны создать другой HTML элемент с атрибутом `ng-controller`, содержащим имя нашего контроллера.

Это две метки области, которой соответствует `$scope`.

Это был очень простой пример с фиксированным значением атрибута, который используется в выражении.

## Контроллер Hello user

Давайте посмотрим на более сложный пример, в котором мы получаем введенное пользователем значение и обрабатываем
его в контроллере. Обработка будет очень простой, просто конкатенация с заданной строкой.

{% include file="examples/angular/hello_user_controller.js" %}

В этом примере атрибут `NameChange`, который мы добавили в `$scope`, это функция,
и эта функция будет создавать значение для атрибута `$scope.greeting`, используя
значение из `$scope.name`.

HTML

{% include file="examples/angular/hello_user_controller.html" %}

[view](examples/angular/hello_user_controller.html)

Атрибут `ng-model="name"` связывает введенные данные элемента с переменной `$scope.name`.

Атрибут `ng-keyup="NameChange()"` связывает событие `keyup` страницы HTML с функцией определенной в `$scope.NameChange`.
Это означает, что функция будет вызвана каждый раз, когда содержимое поля ввода будет меняться.

Два выражения в HTML коде `{{name}}` и `{{greeting}}` будут отображать содержимое `$scope.name` и `$scope.greeting` соответственно.

В результате, если мы напишем "Foo" в поле ввода, наша страница отобразит "Hello Foo" в теге `h1` и `Foo` в теге `h2`.

