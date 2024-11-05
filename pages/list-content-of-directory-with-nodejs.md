---
title: "Содержимое директории на Node.js"
timestamp: 2015-03-28T17:47:01
tags:
  - fs.stat
published: true
books:
  - nodejs
author: szabgab
original: list-content-of-directory-with-nodejs
translator: name2rnd
archive: true
---


По аналогии с командой `dir` в MS Windows (а точнее в DOS) или с командой `ls` в Unix/Linux, мы напишем скрипт на Node.js,
реализующий такое же поведение. Он будет получать имя директории и возвращать содержимое директории с некоторой информацией о каждом элементе
в этой директории.


Мы уже знаем [как получить информацию о файле или директории из inode](/system-information-about-a-file-or-directory-in-nodejs), 
таким образом, мы можем просто вызвать [fs.stat](http://nodejs.org/api/fs.html#fs_fs_stat_path_callback) для каждого элемента
в директории.

Этот скрипт получает путь к директории в командной строке (обязательный параметр),
а затем перечисляет содержимое этой директории (без рекурсии).

{% include file="examples/node/read_dir.js" %}

Если вы читали статью о [получении системной информации об одном файле](/system-information-about-a-file-or-directory-in-nodejs),
тогда вам уже известна первая часть нашего скрипта.
А вот новая интересная часть:

```javascript
fs.readdir(path, function(err, items) {
    console.log(items);

    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }
});
```

Здесь мы используем метод [readdir](http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback) класса [fs](http://nodejs.org/api/fs.html),
который получает путь и функцию-коллбек в качестве параметров.
Метод читает содержимое директории в память, а когда чтение завершено, то вызывает коллбек с двумя параметрами.

Если произошла какая-то ошибка, тогда первый параметр будет содержать информацию об этом. Если все прошло хорошо, тогда второй параметр будет
содержать массив со всеми найденными в директории элементами (файлы, директории, символьный ссылки и т.д.).

С этого момента внутри нашей функции-коллбека мы можем просто напечатать весь массив, если мы просто хотим убедиться в успешном выполнении,
или пройти циклом по массиву с помощью оператора `for` и сделать что-нибудь с каждым элементом. К примеру, мы можем напечатать каждый элемент.

Список будет содержать все кроме `.` (указывает на текущую директорию) и `..` (представляет собой родительскую директорию).

Вот как это выглядит:

```
$ node examples/node/read_dir.js ~/work/code-maven.com/examples/

[ 'blocking-read-file.js',
  'node_hello_world.js',
  'node_hello_world_port.js',
  'non-blocking-read-file.js',
  'process_exit.js',
  'raw_command_line_arguments.js',
  'read_dir.js',
  'stats.js' ]
blocking-read-file.js
node_hello_world.js
node_hello_world_port.js
non-blocking-read-file.js
process_exit.js
raw_command_line_arguments.js
read_dir.js
stats.js
```

## Подробная информаци о каждом элементе

Теперь, когда мы знаем, как получить содержимое директории, и как [получить информацию о файле](/system-information-about-a-file-or-directory-in-nodejs),
мы можем соединить эти две процедуры.

{% include file="examples/node/list_dir_direct.js" %}

Код достаточно прост и понятен. И он также содержит ошибки, как мы увидим чуть позже.

Внутри коллбека для метода `readdir` у нас есть цикл `for`.
В этом цикле в каждой итерации мы выводим имя текущего файла (после добавления полного пути директории) - в основном для отладочных целей -
и вызываем `fs.stat`. Этот метод в свою очередь тоже принимает коллбек. Там мы выводим имя файла - в этот раз, как часть результата,
и затем выводим размер файла. Мы могли бы вывести все данные о файле как мы это делали в 
[другой статье](/system-information-about-a-file-or-directory-in-nodejs), но сейчас размера достаточно.

Вывод в консоль:

```
$ node examples/node/list_dir_direct.js ~/work/code-maven.com/examples/

Start: /home/gabor/work/code-maven.com/examples//blocking-read-file.js
Start: /home/gabor/work/code-maven.com/examples//node_hello_world.js
Start: /home/gabor/work/code-maven.com/examples//node_hello_world_port.js
Start: /home/gabor/work/code-maven.com/examples//non-blocking-read-file.js
Start: /home/gabor/work/code-maven.com/examples//process_exit.js
Start: /home/gabor/work/code-maven.com/examples//raw_command_line_arguments.js
Start: /home/gabor/work/code-maven.com/examples//read_dir.js
Start: /home/gabor/work/code-maven.com/examples//stats.js

/home/gabor/work/code-maven.com/examples//stats.js
97
/home/gabor/work/code-maven.com/examples//stats.js
243
/home/gabor/work/code-maven.com/examples//stats.js
270
/home/gabor/work/code-maven.com/examples//stats.js
151
/home/gabor/work/code-maven.com/examples//stats.js
18
/home/gabor/work/code-maven.com/examples//stats.js
324
/home/gabor/work/code-maven.com/examples//stats.js
27
/home/gabor/work/code-maven.com/examples//stats.js
1382
```

Отладочный вывод напечатал имена как и ожидалось, но внутри коллбека функции `fs.stat()` мы снова печатаем одно и тоже имя файла.
Сравните результаты:

```
$ ls -l ~/work/code-maven.com/examples/
total 64
-rw-r--r--  1 gabor  staff    97 Jan 29 14:26 blocking-read-file.js
-rw-r--r--  1 gabor  staff   243 Jan 27 12:34 node_hello_world.js
-rw-r--r--  1 gabor  staff   270 Jan 27 12:34 node_hello_world_port.js
-rw-r--r--  1 gabor  staff   151 Jan 29 14:26 non-blocking-read-file.js
-rw-r--r--  1 gabor  staff    18 Jan 31 08:24 process_exit.js
-rw-r--r--  1 gabor  staff    27 Jan 29 14:54 raw_command_line_arguments.js
-rw-r--r--  1 gabor  staff   324 Jan 31 15:26 read_dir.js
-rw-r--r--  1 gabor  staff  1382 Jan 31 10:45 stats.js
```

Количество выведенных строк совпадает с количеством файлов (мы их печатали в том же порядке, как и вызывали `fs.stat()`),
но по какой-то причине содержимое переменной `file` было одно и то же для каждого коллбека.
Это случилось потому, что переменная `file` это просто глобальная переменая (с точки зрения коллбека), и в первый раз, когда
коллбек был вызван, переменная `file` содержала уже имя последнего файла в директории.

Таким образом, если мы хотим сочетать имя файла и результат вызова функции `fs.stat()`, тогда мы должны опираться на порядок вызовов.
Но можем ли мы полагаться на него?
В этом конкретном случае вызова функции для каждого файла в директории это могло бы сработать как мы ожидаем - вызов функций по порядку.
Но в случае более сложных операций, особенно, если есть еще и внутренние коллбеки, мы не можем полагаться на то, что функции будут вызваны
в нужном нам порядке - в порядке их инициализации.

Следовательно, нам нужен способ передачи параметра `file` во внутренний коллбек.

## Генерация коллбеков

В этот раз, вместо добавления жестко заданного коллбека, мы будем вызывать функцию `generate_callback()`, которая будет генерировать
для нас коллбеки.

Теперь каждый раз, когда мы вызываем `fs.stat()`, до того как `fs.stat()` будет реально выполнен,
JavaScript будет вызывать функцию `generate_callback()` с текущим значением переменной `file`.
`Generate_callback` будет создавать новую функцию и затем возвращать ее нам.
Эта вновь созданная функция станет коллбеком для метода `fs.stat()`.

{% include file="examples/node/list_dir_generate.js" %}

Результат:

```
$ node examples/node/list_dir_generate.js ~/work/code-maven.com/examples/
Start: /Users/gabor/work/code-maven.com/examples//blocking-read-file.js
Start: /Users/gabor/work/code-maven.com/examples//node_hello_world.js
Start: /Users/gabor/work/code-maven.com/examples//node_hello_world_port.js
Start: /Users/gabor/work/code-maven.com/examples//non-blocking-read-file.js
Start: /Users/gabor/work/code-maven.com/examples//process_exit.js
Start: /Users/gabor/work/code-maven.com/examples//raw_command_line_arguments.js
Start: /Users/gabor/work/code-maven.com/examples//read_dir.js
Start: /Users/gabor/work/code-maven.com/examples//stats.js

/Users/gabor/work/code-maven.com/examples//blocking-read-file.js
97
/Users/gabor/work/code-maven.com/examples//node_hello_world.js
243
/Users/gabor/work/code-maven.com/examples//node_hello_world_port.js
270
/Users/gabor/work/code-maven.com/examples//non-blocking-read-file.js
151
/Users/gabor/work/code-maven.com/examples//process_exit.js
18
/Users/gabor/work/code-maven.com/examples//raw_command_line_arguments.js
27
/Users/gabor/work/code-maven.com/examples//read_dir.js
324
/Users/gabor/work/code-maven.com/examples//stats.js
1382
```

Теперь переменная `file` содержит имя файла, которое было у нее на момент инициализации функции, когда `fs.stat()` приняла ее
в качестве аргумента.

## Безимянные генераторы функций

В заключение давайте посмотрим решение без использования внешней функции `generate_callback`.

Функция все еще здесь, но у нее просто нет имени. Вместо отдельного объявления мы ее включили в `fs.stat()`.
Я не уверен, нравится ли мне это или вариант более длинный. Возможно, с функцией `generate_callback` получается более читаемо.

{% include file="examples/node/list_dir_noname.js" %}
