---
title: "Handlebars с более сложными данными"
timestamp: 2015-05-03T08:52:01
tags:
  - Handlebars
published: true
books:
  - javascript
  - handlebars
author: szabgab
original: handlebars-with-slightly-complex-data
translator: name2rnd
archive: true
---


В статье, где мы впервые рассмотрели [Handlebars (шаблонизатор JavaScript)](/introduction-to-handlebars-javascript-templating-system),
был работающий пример, но возможно он был недостаточно убедителен в отношении, почему использование Handlebars лучше конкатенации для создания HTML сниппетов.

Затем был еще этот пример с [Ajax запросом, возвращающим JSON данные](/ajax-request-for-json-data).
Там мы также использовали простой JavaScript, но там было уже совсем неприятно. Давайте теперь посмотрим, как мы можем делать
те же самые вещи, используя Handlebars.


В предыдущем примере мы получили JSON-ответ со следующим содержимым:

{% include file="examples/js/data.json" %}

Мы использовали этот код:

{% include file="examples/js/ajax.js" %}

[Попробовать здесь!](/try/examples/js/ajax.html)

## Используя Handlebars

Функция `ajax_get` осталась такой же. Она была рассмотрена в статье про [Ajax запрос](/ajax-request-for-json-data).

Изменения в строках 23-25, где вместо конкатенации HTML по фрагментам, мы получаем шаблон из элемента с id `text-template`,
компилируем исходный код шаблона в функцию `template`, а затем просто передаем в нее данные, которые мы получили
из Ajax запроса. Намного чище, чем раньше, когда мы должны были думать об использовании одинарных кавычек снаружи так,
чтобы они не пересекались с двойными кавычками, которые мы хотели использовать для HTML атрибутов. 

{% include file="examples/js/ajax_handlebars.js" %}

Сам шаблон находится в HTML файле в теге `script`.

{% include file="examples/js/ajax_handlebars.html" %}

[view](examples/js/ajax_handlebars.html)

Плейсхолдеры для `{{title}}` и `{{description}}` это простые значения, которые мы уже видели во
 [введении в Handlebars](/introduction-to-handlebars-javascript-templating-system), 
но здесь также есть цикл для прохождения по элементам массива.
`{{#each articles}}` начинает цикл по элементам массива, лежащего в ключе `articles`.
Цикл заканчивается, когда мы достигаем инструкции `{{/each}}`.
Внутри цикла мы можем использовать ключи объектов, которые являются элементами массива `articles`.

Это делает шаблон гораздо чише, чем он был раньше, когда мы использовали конкатенацию.

