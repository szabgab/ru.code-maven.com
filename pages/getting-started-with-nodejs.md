---
title: "Начинаем с Node.js"
timestamp: 2015-02-02T14:30:00
tags:
  - require
  - http
published: true
books:
  - nodejs
author: szabgab
original: getting-started-with-nodejs
translator: name2rnd
archive: true
---


Посмотрев первые главы нескольких учебников по Node.js, я подумал, что стоит тоже начать с простого примера "Hello World".


Прежде, чем вы начнете, возможно вам нужно будет установить [Node.js](http://nodejs.org/), но я не хочу утомлять вас этими подробностями.
На OSX все было вполне очевидно, а на других операционных системах я еще не пробовал.

## Hello World

{% include file="examples/node/hello_world.js" %}

В первой строке этого примера мы загрузили библиотеку [>http](http://nodejs.org/api/http.html), которая предоставляет все необходимые инструменты для запуска простого неблокирующего веб-сервера. 

Затем мы создали объект сервера, используя метод [>createServer](http://nodejs.org/api/http.html#http_http_createserver_requestlistener) из только что подгруженного класса `http`. Это метод получает единственный параметр - функцию. Каждый раз, когда пользователь будет обращаться к вашему веб-серверу, будет вызываться эта функция, получающая два параметра. Первый из них представляет собой текущий `request` (запрос), а второй - текущий `response` (ответ).

В этом примере нам все равно, что запрашивает пользователь (следовательно, мы не анализируем объект запроса), мы просто отправляем ответ.
Сначала мы устанавливаем заголовок ответа [200 OK HTTP status code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes),
который означает "все в порядке". Затем мы отправляем содержимое нашей страницы, и в конце вызываем метод `end()` объекта 
<h1>response</h1>, означающий конец ответа.

Мы получили объект сервера, созданный методом `createServer`, и присвоили его переменной `s`.
Затем вызвали метод `listen` этого объекта, чтобы запустить сервер. 

Node.JS это событийно-ориентированная технология, мы запустили "event loop" для прослушивания событий на порту 8080.
Последняя строка в примере - просто вывод в консоль (командная строка, где мы запустили этот код), сообщающий пользователю, 
как зайти через браузер.

Как только я это написал, то сразу же и запустил:

`node examples/node/hello_world.js`

Что получилось?

```
Listening on http://127.0.0.1:8080/

events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: listen EADDRINUSE
    at errnoException (net.js:905:11)
    at Server._listen2 (net.js:1043:14)
    at listen (net.js:1065:10)
    at Server.listen (net.js:1139:5)
    at Object.<anonymous> (/Users/gabor/work/articles/code-maven/examples/node/hello_world.js:9:3)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
```

Отлично, он написал мне "Listening ...." в консоли, но почему же он не запустился?

Мне потребовалось какое-то время, чтобы найти другое приложение, занявшее этот порт.

Думаю, было бы весьма полезно, если бы сообщение об ошибке включало какую-нибудь подсказку, в чем может быть проблема.

В общем, я изменил порт `s.listen(8081);` и снова запустил код:

`node examples/node/hello_world.js`

Он вывел вот это в консоль и стал ждать.

```
Listening on http://127.0.0.1:8080/
```

Но почему он пишет, что слушает порт 8080? Я же только что изменил его на 8081.

А, ну конечно, номер 8080 у меня встречается в двух местах в коде, а я заменил только в одном.

Это нарушает один из важнейших принципов программирования, называемый 
[DRY - Do Not Repeat Yourself](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Не повторяй себя).
Лучше будет присвоить номер порта какой-нибудь переменной, а затем везде использовать ее.

Новый вариант кода почти такой же:

{% include file="examples/node/hello_world_port.js" %}

Запускаем вот так:

`node examples/node/hello_world_port.js`

Теперь, если я открою браузер и наберу там http://127.0.0.1:8081/, то увижу "Hello World".
