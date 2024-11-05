---
title: "ARGV - аргументы командной строки в Ruby"
timestamp: 2016-02-27T20:45:01
tags:
  - ARGV
  - to_i
published: true
books:
  - ruby
author: szabgab
original: argv-the-command-line-arguments-in-ruby
translator: name2rnd
archive: true
---


Когда вы запускаете скрипт на Ruby, то можете указать любые значения в командной строке после имени скрипта:

Например:

`ruby code.rb abc.txt  def.txt qqrq.txt`

или вот так:

`ruby code.rb Hello --machine big -d -tl`

Вопрос в том, как программа на Ruby понимает, что передано в командной строке.


Ruby предоставляет массив `ARGV` со значениями из командной строки.
Мы можем получить доступ к элементам этого массива так же, как и в случае любого другого массива:

`ARGV[0]` это первое значение после имени скрипта.

Мы можем обойти все элементы либо с помощью цикла `for`:

{% include file="examples/ruby/command_line_argv.rb" %}

либо с помощью [диапазона](/range-in-ruby) индексов, получая элементы по индексу.

{% include file="examples/ruby/command_line_argv_with_index.rb" %}

```
$ ruby command_line_argv_with_index.rb foo bar --machine big
0 foo
1 bar
2 --machine
3 big
```

## Проверка количества аргументов

Для простой валидации переданных значений мы можем проверить длину массива `ARGV`.
И если мы получили недостаточно аргументов, то сообщить об этом и преждевременно завершить работу программы.

{% include file="examples/ruby/command_line_argv_check_length.rb" %}

Запустив скрипт, мы получим:

```
$ ruby command_line_argv_check_length.rb one
Too few arguments

$ ruby command_line_argv_check_length.rb one two
Working on ["one", "two"]
```

## Значения из командной строки имеют тип строка

Во фрагменте кода мы сначала проверяем, получили ли мы точно 2 параметра, и если да, то суммируем их:

{% include file="examples/ruby/command_line_argv_add.rb" %}

```
ruby command_line_argv_add.rb 23 19
2319
```

Результат вас не удивит, если вы знаете, что переданные в командную строку значения, приходят в программу как строки.
Даже если это на самом деле числа. Если мы хотим использовать их как числа, то нужно их сконвертировать с помощью `to_i`:

```
$ ruby command_line_argv_add_numbers.rb 23 19
42
```

