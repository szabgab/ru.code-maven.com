---
title: "Hello World с Flask и Python"
timestamp: 2015-05-16T09:33:01
tags:
  - Flask
published: true
books:
  - python
  - flask
author: szabgab
original: hello-world-with-flask-and-python
translator: name2rnd
archive: true
---


[Flask](http://flask.pocoo.org/) это микрофреймворк для Python, основанный на 
[Werkzeug](http://werkzeug.pocoo.org/), [Jinja 2](http://jinja.pocoo.org/) и хороших намерениях.

В этой статье мы рассмотрим пример "Hello World" на Flask, который описан на главной странице сайта этого фреймворка.


{% include file="examples/flask/hello_world.py" %}

После установки Flask с помощью `pip install Flask` я могу запустить приведенный выше скрипт через командную строку:

```
$ python examples/flask/hello_world.py 
```

И увижу такой ответ:

```
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Затем я открыл браузер по указанному адресу и там действительно отображался "Hello World!", тем временем в консоли я увидел:

```
127.0.0.1 - - [03/Feb/2015 09:43:14] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [03/Feb/2015 09:43:14] "GET /favicon.ico HTTP/1.1" 404 -
```

Первая запись это мой запрос, вторая запись относится к браузеру, попытавшемуся загрузить иконку сайта.
В конце первой строки приведен [HTTP-статус 200](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes),
который указывает на успешное выполнение запроса, вторая строка заканчивается HTTP-статусом 404, обозначающим "Not found".

Код приложения выглядит достаточно очевидным.

Мы объявили функцию с произвольным именем (`hello`), и использовали декоратор `@app.route("/")`, чтобы связать
запрос на `/` с этой функцией.

```python
@app.route("/")
def hello():
    return "Hello World!"
```

Когда Flask запущен, он принимает HTTP-запросы, а затем перенаправляет их на функции, основываясь на пути, указанном в запросе.
Таким образом код выше означает - если запрос приходит на `/`, тогда запустить функцию `hello`.

И в конце скрипта мы видим следующее:

```python
if __name__ == "__main__":
    app.run()
```

Код `app.run()` запускает веб-сервер с приложением, основанным на Flask.
Код `if __name__ == "__main__":` позволяет запустить веб-сервер только в случае, если этот код запускается как скрипт.

Это позволит нам использовать повторно код из этого файла как часть другого веб-приложения на Flask.

(В Perl такое поведение называют [Modulino](http://www.masteringperl.org/category/chapters/modulinos/).)



