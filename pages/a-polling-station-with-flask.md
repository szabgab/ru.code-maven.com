---
title: "Голосовалка на Flask"
timestamp: 2015-08-29T17:37:01
tags:
  - render_template
  - request
published: true
books:
  - flask
  - python
author: szabgab
original: a-polling-station-with-flask
translator: name2rnd
archive: true
---


В этой серии статей мы будем делать приложение для запуска голосований и, может быть, даже опросов с использованием Flask.

Дополнительно к этой статье, вы можете следить за развитием приложения в [этом](https://github.com/szabgab/flask-poll) репозитории.

Давайте начнем с создания простого Flask-based приложения.


Мы создали новую директорию и в ней создали такой скрипт на Python:

{% include file="examples/flask/poll1/poll.py" %}

Мы создали обработчик для `/`, который вызывает функцию `root()`.
Эта функция возвращает страницу, собранную из шаблона `poll.html`. Сам шаблон находится в поддиректории `templates/`.

{% include file="examples/flask/poll1/templates/poll.html" %}

Сейчас директория нашего проекта выглядит вот так:

```
$ tree
.
├── poll.py
└── templates
    └── poll.html
```

Теперь мы можем запустить приложение командой `python poll.py`, которая скажет нам:

```
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
```

Если открыть браузер по полученному адресу, то мы увидим следующее:

<img src="/img/flask_poll_1.png" alt="Flask poll" />

Немного, но оно работает. Прям как [hello world](/hello-world-with-flask-and-python), но с шаблоном.

```
$ git init
$ git add .
$ git commit -m "step 1 - hello world with a template"
```

[commit](https://github.com/szabgab/flask-poll/commit/c78124201aeb49a2853cac6dc9d28fc1ee03edb3).

## Отображение голосования

Чтобы провести голосование, нам нужен вопрос и варианты ответа для выбора.
Возможно, позже это все будет перемещено в конфигурационный файл, но сейчас давайте просто создадим словарь с данными
в нашем приложении.

```python
poll_data = {
   'question' : 'Which web framework do you use?',
   'fields'   : ['Flask', 'Django', 'TurboGears', 'web2py', 'pylonsproject']
}
```

Мы также изменили вызов рендеринга шаблона `render_template` и теперь
передаем туда наш словарь под ключом `data`.

{% include file="examples/flask/poll2/poll.py" %}

В шаблоне мы используем выражение `{{ data.question }}`, чтобы добавить вопрос.
Мы используем эту конструкцию для двух случаев: заголовка нашей страницы, который вы видите во вкладке браузера,
и в качестве элемента `h1`.

Затем мы создаем форму с `action="/poll">`, это значит, что мы должны создать новый обработчик для этого
запроса в нашем приложении.
Внутри формы мы создаем несколько элементов `radio` для ввода данных (выбора значений).
По одному для каждого варианта ответа. Тип поля radio хорошо подходит, когда нам нужно получить 
ровно один ответ.

{% include file="examples/flask/poll2/templates/poll.html" %}

После всех этих изменений зайдем на нашу страницу, и вот что мы увидим:

<img src="/img/flask_poll_2.png" alt="Flask poll" />

Если выбрать один из элементов и нажать кнопку "Vote", то получим такой ответ:

<img src="/img/flask_poll_2_2.png" alt="Flask poll" />

Это значит, что мы еще не добавили обработчик для `/poll`. Давайте сделаем его.

```
$ git add .
$ git commit -m "add poll data and display it"
```

[commit](https://github.com/szabgab/flask-poll/commit/2a293a4051bc4ba3ae4c8b95dd1e02b669a76b82)

## Принимаем результаты голосования

Первый шаг это добавление хендлера для обработки `/poll`, прием значения поля `field` формы с помощью
`request.args.get('field')`. Для начала, просто вернем выбранное значение пользователю:

```python
@app.route('/poll')
def poll():
    vote = request.args.get('field')
    return vote 
```

Мы можем перезагрузить страницу в браузере и увидим там выбранный нами вариант:

<img src="/img/flask_poll_3_1.png" alt="Flask poll" />

Следующий шаг - сохранение результатов. Для простоты мы будем использовать обычный файл.
В начале скрипта `poll.py` мы добавим имя файла в виде переменной:
`filename = 'data.txt'` (всегда хорошо иметь переменные для таких случаев),
а затем открываем файл, чтобы добавить туда контент (используя `'a'` в качестве аргумента для функции `open`),
записываем результат в файл и закрываем файл.

Мы собираемся хранить по одному результату голосований в строке. Тогда будет легко собирать данные впоследствии.

```python
@app.route('/poll')
def poll():
    vote = request.args.get('field')

    out = open(filename, 'a')
    out.write( vote + '\n' )
    out.close()

    return vote 
```

Теперь, если мы обновим веб-страницу, наш выбранный вариант сохранится в файл данных, но мы все еще получаем обратно выбранный вариант.
Вместо этого, давайте добавим более дружественную страницу благодарности:

```python
    return render_template('thankyou.html', data=poll_data)
```

Теперь Flask скрипт выглядит вот так:

{% include file="examples/flask/poll3/poll.py" %}

Шаблон страницы благодарности вот такой:

{% include file="examples/flask/poll3/templates/thankyou.html" %}

```
$ git add poll.py templates/thankyou.html
$ git commit -m "save the vote and thank the voter"
```

[commit](https://github.com/szabgab/flask-poll/commit/ba5a516c7e1506d7c25807ebd18e9ef388df2b9b)

Эта версия голосовалки уже работает, но давайте добавим еще одну страницу - с результатами голосования.

## Отображение результатов

Для отображения результатов мы создадим еще один обработчик (для пути с именем `/results`), который будет читать файл с данными
и показывать количество голосов по каждому варианту.

Вот наш обработчик:

```python
@app.route('/results')
def show_results():
    votes = {}
    for f in poll_data['fields']:
        votes[f] = 0

    f  = open(filename, 'r')
    for line in f:
        vote = line.rstrip("\n")
        votes[vote] += 1

    return render_template('results.html', data=poll_data, votes=votes)
```

Сначала мы создали словарь `votes`, куда собираемся собрать количество голосов.
Затем мы идем по списку ожидаемых значений из исходного списка значений и создаем там элементы для каждого из них с количеством 0.
Это будет гарантией, что каждый элемент из нашего списка вариантов представлен в результатах, 
даже есть за него никто не проголосовал.

Затем мы открываем файл с данными для чтения и читаем построчно. Перед обновлением нашего словаря `votes`, 
мы должны удалить символы перевода строки с помощью `line.rstrip("\n")`.

Затем мы передаем собранные результаты голосований в функцию `render_template`.

Шаблон выглядит вот так:

{% include file="examples/flask/poll4/templates/results.html" %}

и вот скрипт целиком:

{% include file="examples/flask/poll4/poll.py" %}

Если мы перейдем по ссылке http://127.0.0.1:5000/results, то увидим такой ответ:

<img src="/img/flask_poll_4.png" alt="Flask poll" />

```
$ git add poll.py templates/results.html
$ git commit -m "show the results"
```

[commit](https://github.com/szabgab/flask-poll/commit/9c0f04d7c7d80da68c681dfec2c0f7ad4f4d605a)

## Что дальше?

[Тестирование голосовалки на Flask](/testing-the-flask-poll).

