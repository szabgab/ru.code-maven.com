---
title: "Добавляем сниппеты кода в Atom - текстовый редактор"
timestamp: 2015-08-01T13:24:01
tags:
  - Atom
published: true
books:
  - atom
author: szabgab
translator: name2rnd
original: add-code-snippets-to-atom
archive: true
---


Сниппеты это великолепная штука в любом редакторе и IDE.
В [Atom](https://atom.io/) они достаточно просты в использовании.


## Как использовать сниппеты в Atom

В файле вы начинаете набирать префикс существующего сниппета. 
Atom покажет список сниппетов, которые совпадают с написанным текстом.
Когда вы прекратите ввод текста, то сможете выбрать один из них, используя стрелки вверх и вниз.

<img src="/img/atom_snippet_use.png" alt="Сниппеты Atom в действии" />

Когда вы нажмете TAB или ENTER, Atom вставит код сниппета на то место, где вы начинали вводить текст.

В Atom есть много предустановленных сниппетов, и также вы можете легко создать свои собственные.

## Добавляем свой сниппет в Atom

Ваш собственный сниппет должен быть описан в файле `snippets.cson`, который находится
в домашней директории. У меня это директория `~/.atom/`, хотя я об этом даже не знал.
Если я открою меню "Atom", то там есть пункт `Open Your Snippets`, который открывает
`snippets.cson` в вашем любимом редакторе.

<img src="/img/atom_snippet_editor.png" alt="Меню Atom для открытия редактора сниппетов" />

В этом файле вам нужно написать такой код

```
'.text.html':
  'HTML 5':
    'prefix': 'html'
    'body': '''
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
        <title></title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.3/handlebars.min.js"></script>
        <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>

        <link href="style.css" rel="stylesheet">
      </head>
      <body>

      </body>
    </html>
'''
```

Это будет работать для html файлов.

Первая строка описывает область, где сниппет должен работать.

Каждый тип файла имеет свою область, и каждое расширение файла привязано к области.
Конкретно область HTML файлов это `text.html.basic` и следующие расширения файлов рассматриваются
как HTML файлы:
`htm, html, kit, shtml, tmpl, tpl, xhtml`

Я знаю это, потому что открыл `Settings` (На самом деле, это пункт меню `Atom / Preferences`)
и среди `Packages` нашел тот, что обрабатывает HTML файлы. Вот как он выглядит:

<img src="img/atom_html_file_type.png" alt="Типы HTML файлов в Atom" />
