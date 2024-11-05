---
title: "Echo с Flask и Python"
timestamp: 2015-05-31T16:15:01
tags:
  - request
  - args
  - form
  - GET
  - POST
published: true
books:
  - python
  - flask
author: szabgab
original: echo-with-flask-and-python
translator: name2rnd
archive: true
---


Чтобы показать, как Flask предоставляет доступ к информации, отправляемой пользователем на сервер, мы 
собираемся создать очень простое приложение, возвращающее назад полученные данные.

Главная страница содержит форму и кнопку. Если мы введем что-нибудь в поле и нажмем кнопку,
запрос будет отправлен на сервер, который вернем нам обратно введенные данные уже на другой странице.


Всего есть два основных метода отправки данных на сервер через HTTP. Один это использование GET-запроса, другой - POST-запроса.
Сначала давайте посмотрим решение с GET-запросом:

## Использование GET-запроса

{% include file="examples/flask/echo_get.py" %}

У нас есть два роута (маршрута, пути). Первый, что отвечает на запрос `/`, отправит нам HTML-сниппет, который мы описали в коде.
Как только мы рассмотрим основные примеры, мы перейдем к использованию шаблонизатора, чтобы разделить HTML и Python, но 
для этого примера мы все еще используем HTML, описанный прямо в скрипте.

Этот HTML-сниппет отобразится в нашем браузере как поле для ввода и кнопка. Свойство `action` элемента `form`
говорит браузеру, куда отправлять данные, когда пользователь нажмет на кнопку `submit`.
Свойство `method` говорит браузеру, какой метод использовать. И хотя `GET` используется по умолчанию, я 
все равно его добавил, чтобы сделать пример более понятным.

В нашем случае имеется в виду, что когда пользователь нажмет на кнопку, браузер отправит `GET`-запрос на `/echo`.

Если мы напишем "hello" и нажмем на кнопку, то увидим, что URL в строке адреса браузера сменился на 
`http://127.0.0.1:5000/echo?text=hello`

Имя поля "text" это значение атрибута `name` элемента `input` в нашем HTML на главной странице.
"hello" это то, что мы там написали.

Второй путь привязывает URL `/echo` к функции `echo`.

Самая интересная часть в этой функции это использование контекста [request](http://flask.pocoo.org/docs/0.10/reqcontext/). 
`request` имеет атрибут с именем `args`, который является словарем и содержит данные, полученные в URL. 
В нашем случае там будет ключ "text" со значением "hello".

Вместо прямого доступа к значению ключа "text" с помощью `request.args['text']` мы используем метод `get`
и сразу же указываем пустое значение как значение по умолчанию. `request.args.get('text', '')`

Причина, по которой мы выбираем второй способ, кроется в самом Python - если мы пытаемся получить значение ключа, которого
не существует, даже просто для чтения, Python генерирует исключение. (Другими словами, Python 
не предоставляет [/autovivification](https://perlmaven.com/autovivification).)

Пользователь может просто исправить значение в адресной строке. Если он решит убрать вообще все атрибуты
и отправить запрос на `http://127.0.0.1:5000/echo`, тогда запрос сгенерирует исключение и 
в браузере будет сообщение <b>Bad Request</b>.

Мы могли бы добавить код, ловящий такие исключения, но кажется проще вызывать `get`
и если там не будет такого ключа, то позволить ему вернуть пустую строку.
Тогда эта функция просто вернет обратно текст "You said: " и дальше то, что ввел пользователь.

## Использование POST-запроса

{% include file="examples/flask/echo_post.py" %}

Здесь было немного изменений:

<ol>
  <li>В описанном HTML мы заменили метод `GET` на `POST`</li>
  <li>В определении роута (маршрута) мы явно указали обрабатывать POST-запрос: `@app.route("/echo", methods=['POST'])>`</li>
  <li>Мы получаем данные, отправленные пользователем, из словаря `form` объекта `request`</li>
</ol>

В этом случае Flask рекомендуем обращаться к ключам словаря `form` напрямую, используя квадратные скобки: `request.form['text']`.

Причина в том, что для обычного пользователя отправить форму с неверными ключами намного сложнее, но если такое случилось, то
лучше сгенерировать исключение. Нам не нужно делать это вручную, потому что Python его нам сгенерирует.

Если мы не хотим получать эти исключения, тогда мы можем использовать код, похожий на предыдущий:
`request.form.get('text', '')`

Перед запуском нового скрипта убедитесь, что предыдущий остановлен. Иначе вы получите противное исключение:

```
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
Traceback (most recent call last):
  File "examples/flask/echo_post.py", line 14, in <module>
    app.run()
  File "/Library/Python/2.7/site-packages/flask/app.py", line 772, in run
    run_simple(host, port, self, **options)
  File "/Library/Python/2.7/site-packages/werkzeug/serving.py", line 624, in run_simple
    inner()
  File "/Library/Python/2.7/site-packages/werkzeug/serving.py", line 602, in inner
    passthrough_errors, ssl_context).serve_forever()
  File "/Library/Python/2.7/site-packages/werkzeug/serving.py", line 512, in make_server
    passthrough_errors, ssl_context)
  File "/Library/Python/2.7/site-packages/werkzeug/serving.py", line 440, in __init__
    HTTPServer.__init__(self, (host, int(port)), handler)
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/SocketServer.py", line 419, in __init__
    self.server_bind()
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/BaseHTTPServer.py", line 108, in server_bind
    SocketServer.TCPServer.server_bind(self)
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/SocketServer.py", line 430, in server_bind
    self.socket.bind(self.server_address)
  File "/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/socket.py", line 224, in meth
    return getattr(self._sock,name)(*args)
socket.error: [Errno 48] Address already in use
```

По крайней мере, в отличие от [Node.js](/getting-started-with-nodejs), здесь показано нормальное объяснение
на последней строке ошибки.

Как только вы успешно запустили новый скрипт, нужно также не забыть перезагрузить страницу по адресу http://127.0.0.1:5000/.

Если этого не сделать, то там будет содержаться предыдущий HTML код, который отправляет данные, используя `GET`.
Если нажать на кнопку из старого HTML, оставшегося в браузере, а новый скрипт уже запущен, тогда новый скрипт выдаст следующую ошибку в браузер:

```
Method Not Allowed

The method is not allowed for the requested URL.
```

Это случилось, потому что браузер отправил `GET`-запрос, но новый скрипт обрабатывает только метод `POST` для URL `/echo`.

## Как вызвать ошибку в POST-запросе?

Как мы увидели, если использовать `GET`-запрос, то пользователь легко может отправить некорректные данные с отсутствующими 
или лишними полями. Пользователь может просто загрузить http://127.0.0.1:5000/echo или http://127.0.0.1:5000/echo?txt=hello.

Если использовать `POST`-запрос, тогда отправить неверный запрос будет сложнее.
Это нельзя сделать просто из браузера, хотя для таких вещей есть специальные плагины.

С другой стороны очень просто отправить некорректный запрос, используя `curl`
из командной строки Linux/Unix:

Отправим POST-запрос без данных и посмотрим ошибку:

```
$ curl --data '' http://127.0.0.1:5000/echo

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>400 Bad Request</title>
<h1>Bad Request</h1>
<p>The browser (or proxy) sent a request that this server could not understand.</p>
```

Отправим POST-запрос с некорректными данным (имя поля будет txt вместо text), и увидим ошибку:

```
$ curl --data 'txt=world' http://127.0.0.1:5000/echo

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>400 Bad Request</title>
<h1>Bad Request</h1>
<p>The browser (or proxy) sent a request that this server could not understand.</p>
```

... и просто покажу, что проблема не в `curl`. Если мы отправим нормальные данные, то получим нормальный ответ:

```
$ curl --data 'text=world' http://127.0.0.1:5000/echo

You said: world
```

## Вывод

Вы можете получить доступ к значениям, переданным в URL, с помощью `request.args`, а к значениям, переданным через POST-request - с помощью `request.form`.

Рекомендованный способ доступа к значениям: через `request.args.get('key', '')` для GET-запросов и `request.form['key']` для POST-запросов, хотя мы можем использовать
любой.

