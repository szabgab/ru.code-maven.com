---
title: "Функция vs Генератор в Python"
timestamp: 2016-03-19T10:57:01
tags:
  - yield
published: true
books:
  - python
author: szabgab
original: function-vs-generator-in-python
translator: name2rnd
archive: true
---


Мы посмотрели как сделать [простую функцию и использовать колбек](/function-or-callback-in-python), чтобы сделать функцию более универсальной.
Мы так же посмотрели как [создать итератор](/callback-or-iterator-in-python) для упрощения кода.
В этот раз мы собираемся посмотреть как конвертация функции в генератор (после изучения, как это работает)
становится наиболее очевидным решением.


## Простая функция

В качестве напоминания давайте посмотрим исходную функцию Fibonacci, с которой мы начали,
когда мы должны были жестко описать условие, или в более гибком случае использовать колбек.

{% include file="examples/python/fibonacci_function.py" %}

## Генератор

{% include file="examples/python/fibonacci_generator.py" %}

Этот пример с генератором почти такой же, как и простая функция, и мы можем его
использовать точно также, как использовали [итератор](/callback-or-iterator-in-python).

Единственное добавление в реализации функции `fibonacci`
это вызов `yield` каждый раз, когда вычислено новое значение.
Этот вызов приостанавливает выполнение функции `fibonacci`
и возвращает управление вызывающей сущности вместе со значением, переданным в оператор `yield`.

В первой итерации цикла `for` функция `fibonacci` начнет работу 
со своего первого оператора создания пустого массива значений `values`.

Когда она встретит оператор `yield`, она вернет значение `values[-1]`, которое
будет присвоено переменной `f` в цикле `for`, дальше цикл `for` продолжит выполнение.
Здесь мы описываем наше условие по прерыванию цикла.

Если мы не прервем выполнение на первой итерации, тогда в последующих итерациях 
цикла `for` функция `fibonacci` продолжит выполнение точно с того места,
где она была приостановлена. Имеется в виду, что содержимое `values`
будет таким же, каким мы его и оставили, а первый оператор, который будет выполнен после вызова `yield`,
это проверка на `True` в операторе `while(True):`.

Таким образом функция `fibonacci` ведет себя точно также, как и [итератор Fibonacci](/callback-or-iterator-in-python),
делая наш код проще.
