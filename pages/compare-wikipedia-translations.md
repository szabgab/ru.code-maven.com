---
title: "Упражнение: Сравнение переводов Wikipedia"
timestamp: 2016-03-27T18:12:01
tags:
  - exercises
  - projects
published: true
books:
  - ruby
  - python
  - javascript
  - php
author: szabgab
original: compare-wikipedia-translations
translator: name2rnd
archive: true
---


Выбрав статью на [English Wikipedia](https://en.wikipedia.org/), например про [Perl](https://en.wikipedia.org/wiki/Perl),
[Python](https://en.wikipedia.org/wiki/Python_%28programming_language%29),
[Ruby](https://en.wikipedia.org/wiki/Ruby_%28programming_language%29),
[PHP](https://en.wikipedia.org/wiki/PHP), или [JavaScript](https://en.wikipedia.org/wiki/JavaScript),
сделайте программу, которая получит размер каждой переведенной версии этой статьи на
все языки на Википедии.

В зависимости от степени исследования, которое вы захотите провести, вы можете приступить сразу или посмотреть <b>подсказки</b>.

## Подсказки

Wikipedia предоставляет [API для получения содержимого страницы](https://www.mediawiki.org/wiki/API:Main_page) в некотором формает.
Так же есть более подробная документация об [API](https://www.mediawiki.org/wiki/Wikibase/API),
включая информацию о [API::Properties](https://www.mediawiki.org/wiki/API:Properties).

Ссылки на языки есть тут - [Wikidata](https://www.wikidata.org/).

## Подсказки

Этот URL вернет содержимое страницы 'Perl' с английской версии Википедии в формате JSON:

```
https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Perl
```

Этот адрес вернет список всех переводов для страницы с Q-id = Q42:

```
https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids=Q42
```

Имея title (в нашем случае PHP), следующий URL вернет Q-id страницы:

```
https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&format=json&titles=PHP
```

## Подсказки

Похоже, что есть 4 типа ссылок на языки, возвращаемые от [Wikidata](https://www.wikidata.org/):

Простые ссылки на Википедии, которые заканчивается словами `itwiki`, `newwiki`, ил `pdcwiki`. 
Там может быть 2 или более символа. Реальный адрес URL это то же самое, но без последних 4 символов.

Ссылки с подчеркиванием типа `zh_yuewiki`, `bat_smgwiki`, или `zh_min_nanwiki`
примерно такие же, но нужно заменить `_` на `-`.

Ссылки [Wikiquote](https://en.wikiquote.org/). Например `enwikiquote`, которая значит https://en.wikiquote.org/.

Ссылки [Wikibook](https://fr.wikibooks.org/), типа `frwikibook` которые значат https://fr.wikibooks.org/.


## Инструменты

## Решение

[wikipedia stats in GitHub](https://github.com/szabgab/wikipedia-stats)


