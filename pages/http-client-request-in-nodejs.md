---
title: "HTTP-запрос клиента в Node.js (GET-запрос и данные из POST-запроса)"
timestamp: 2015-02-22T21:51:01
tags:
  - http
  - request
  - GET
  - POST
published: true
books:
  - nodejs
author: szabgab
translator: name2rnd
original: http-client-request-in-nodejs
archive: true
---


При создании веб-приложения на чистом Node.js вы могли использовать класс [http](http://nodejs.org/api/http.html), 
как мы делали в [Начинаем с Node.js](/getting-started-with-nodejs).
Тогда мы использовали только объект `response`, но если нас интересует сам запрос, тогда нужно взглянуть на 
объект `request`, который мы получаем в функции обратного вызова (callback, колбек).


В этом простом примере `http-сервера на Node.js` выводятся некоторые значения из объекта запроса, который является
экземпляром класса [http.ClientRequest](http://nodejs.org/api/http.html#http_class_http_clientrequest).

{% include file="examples/node/http_client_request.js" %}

Я запустил приведенный выше скрипт с помощью команды `node examples/node/http_client_request.js`, 
он вывел: `Browse to http://127.0.0.1:8081`, и я зашел по указанному адресу через мой обычный браузер.

И вот что было выведено в консоль:

```
GET
{ host: '127.0.0.1:8081',
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36',
  'accept-encoding': 'gzip, deflate, sdch',
  'accept-language': 'en-US,en;q=0.8,he;q=0.6,ru;q=0.4' }
/
GET
{ host: '127.0.0.1:8081',
  connection: 'keep-alive',
  accept: '*/*',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36',
  'accept-encoding': 'gzip, deflate, sdch',
  'accept-language': 'en-US,en;q=0.8,he;q=0.6,ru;q=0.4' }
/favicon.ico
```

Сначала это меня слегка смутило. Почему у меня два GET-запроса? Но потом я кое-что вспомнил и, присмотревшись, все понял.
Первый запрос действительно был к `/` (как вы сами можете увидеть - перед вторым GET-запросом), но затем браузер отправил
второй запрос к `/favicon.ico`. Это автоматический запрос браузера, отправленный в надежде, 
что он сможет поместить это маленькое изображение на вкладке, где я открыл страницу.

Я не хочу, чтобы в моем исследовании была лишная путаница, поэтому я перешел на команду `curl`, которая доступна в Linux/Unix.

Попробуем еще раз:

Я запустил сервер:

```
$ node examples/node/http_client_request.js 
Browse to http://127.0.0.1:8081
```

и открыл еще одно командное окно, где написал свой запрос:

```
$ curl http://127.0.0.1:8081/
```

Затем переключился на предыдущую консоль, чтобы посмотреть ответ:

```
GET
{ 'user-agent': 'curl/7.37.1',
  host: '127.0.0.1:8081',
  accept: '*/*' }
/
```

С этого момента я переключался туда-сюда между двумя консолями.

Второй запрос содержит путь к документу на сервере и параметр со значением:

```
$ curl http://127.0.0.1:8081/some/path?field=value
```

Вывод в консоль был таким же, как и в предыдущем примере, кроме последней строки, которая содержит `url`.

```
GET
{ 'user-agent': 'curl/7.37.1',
  host: '127.0.0.1:8081',
  accept: '*/*' }
/some/path?field=value
```

Последней попыткой стала отправка POST-запроса с некоторыми данными с помощью curl:

```
$ curl --data "field=value" http://127.0.0.1:8081/
```

вывод выглядел вот так:

```
POST
{ 'user-agent': 'curl/7.37.1',
  host: '127.0.0.1:8081',
  accept: '*/*',
  'content-length': '11',
  'content-type': 'application/x-www-form-urlencoded' }
/
```

Первая строка показывает, что это действительно был `POST` запрос, заголовок содержал дополнительные поля, 
но сами данные не отображались.

Конечно, данные должны быть прочитаны и обработаны другим способом.

## Прием HTTP POST запросов в Node.js

{% include file="examples/node/http_client_request_post.js" %}

Это еще одна область, где видна неблокирующая природа Node.js.
Вместо простого чтения данных из объекта запроса, мы добавляем функцию обратного вызова (callback) к событию `data` объекта `request`.
Она [функция] будет вызываться каждый раз, когда придет новая партия данных.
Конечно, если данные это всего лишь 11 символов, как в нашем случае, тогда это не очень интересно, 
но если вы отправляете большой объем данных, тогда нам важно их читать, не блокируя остальную часть сайта.

Теперь, когда у нас есть колбек, ожидающий данные, нам нужно отдать ответ тогда, когда все данные будут приняты.
Таким образом, мы добавили колбек для события `end` объекта `request`, и в нем мы выведем в консоль все данные, 
отправленные клиентом, затем завершим ответ, вызвав метод `end` объекта `response`

Давайте попробуем

```
$ node examples/node/http_client_request_post.js 
Browse to http://127.0.0.1:8081
```

Обычный GET-запрос:

```
$ curl http://127.0.0.1:8081/
```

отработал как раньше:

```
GET
{ 'user-agent': 'curl/7.37.1',
  host: '127.0.0.1:8081',
  accept: '*/*' }
/
```

GET-запрос с указанием документа и параметрами:

```
$ curl http://127.0.0.1:8081/some/path?field=value
```

результат:

```
GET
{ 'user-agent': 'curl/7.37.1',
  host: '127.0.0.1:8081',
  accept: '*/*' }
/some/path?field=value
```

И как ведет себя `POST`-запрос

```
$ curl --data "field=value" http://127.0.0.1:8081/
```

результат в консоли:

```
POST
{ 'user-agent': 'curl/7.37.1',
  host: '127.0.0.1:8081',
  accept: '*/*',
  'content-length': '11',
  'content-type': 'application/x-www-form-urlencoded' }
/
field=value
```

Таким образом, удалось получить данные, отправленные клиентом.
