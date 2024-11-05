---
title: "Crawling и scraping"
timestamp: 2016-02-23T17:44:01
tags:
  - Mechanize
published: true
books:
  - perl
  - python
  - ruby
  - javascript
  - nodejs
author: szabgab
original: adventures-in-crawling-and-scraping-the-world
translator: name2rnd
archive: true
---


Хотя два слова `crawling` и `scraping` обычно взаимозаменяемы - по крайней мере, когда мы говорим о веб -
они могут иметь слегка различающиеся значения. Crawling обычно подразумевает переход от страницы к странице, перемещаясь между сайтами.
Scraping в свою очередь обычно подразумеваем анализ одной или очень ограниченного набора страниц.

Хотя, может быть, я просто выдумал это различие. Кто знает, что другие имеют в виду под этими словами?


`Боты`, `Роботы`, `Веб-пауки`, как правило, относятся к программам, которые реализуют `crawling` или `scraping`

## Задачи

Самая простая задача это скачать заданный URL.

Затем, если нам вернулась HTML страница, мы можем:

Скачать картинки.

Скачать конкретные файлы. (Изображения это одна из возможностей, но возможно, вы бы хотели скачать все JavaScript файлы или все видео, или ...)

## Встречающиеся проблемы

<b>Исключение</b> Есть части веб-сайта, которые вы не хотите обходить. Либо потому что вам не интересно, 
или потому что вы хотите быть хорошим посетителем и соблюдать описанное в файле `robots.txt`.
`robots.txt` это файл, описывающий предпочтения владельца сайта относительно того, какие роботы могут посещать какие области сайта.

<b>Глубина</b> - на какое количество кликов от стартовой страницы вы хотите погрузиться?

<b>Одновременная загрузка</b> - с одной строны, скачивание страниц одной за другой может занять много времени.
С другой стороны, скачивание 100 страниц одновременно может привести к ваше блокировке на сайте.
Вам нужно найти верный баланс.

<b>Пауза между страницами</b> для облегчения нагрузки, что мы генерируем на сервере - мы можем захотеть сделать паузу между скачиванием страниц
с одного и того же сервера.

<b>Стартовые страницы</b> Какой-то способ описать больше одной стартовой страницы.

<b>Циклы</b> Избежание повторяющихся загрузок одних и тех же страниц.

<b>Условия использования</b> некоторые веб-сайты могут иметь официальные документы, описывающие, что вы уполномочены скачивать и что вы можете с этим потом делать.
К примеру, показ аналогичного контента на другом сайте, как это было на оригинальном сайте, обычно не то, что вам стоит делать.

Обработка JavaScript на веб-сайте. 

Обработка параметров в URL. http://examples.org/  http://examples.org/?id=42 Это одна и та же страница? Когда мы встретим вторую, нам нужно удалить параметры после "?"?

Обработка кнопок. Нужно ли нам обходить нажатия по кнопкам или только по ссылкам?

Обработка форм. Должен ли наш обходчик заполнять формы и нажимать на кнопки? Какие значения он должен заполнить?

Кросс-ссылки: Когда мы хотим обойти один или несколько конкретных сайтов, мы должны быть уверены, что ссылки не ведут на внешние ресурсы.
С другой стороны мы бы хотели разрешить переходить по ссылками между сайтами из предопределенного списка URL.

С www или без wwww. Все еще есть сайты, которые предоставляют один и тот же контент с обоих сайтов www.example.com и example.com вместо редиректов
с одного на другой. Мы должны решить, рассматривать это как два разных сайта, или мы бы хотели обойти только один из них.
Что делать, если будут ссылки с одного на другой? Должны ли мы заменить один URL другим, делая вид, что там на самом деле редирект?
Другими словами, если мы решили проиндексировать example.com, но там есть ссылка на http://www.example.com/abc стоит ли пробовать скачать http://example.com/abc вместо этого?

## Инструменты

<h3>JavaScript / NodeJS</h3>

* [http](https://nodejs.org/api/http.html) (посмотрите, как сделать [crawler на NodeJS](/building-a-crawler-in-nodejs))
* [node-crawler](https://github.com/sylvinus/node-crawler)
* [node-jsdom](https://www.npmjs.com/package/node-jsdom)
* [node-crawler-cheerio](https://github.com/virushuo/node-crawler-cheerio)
* [PhantomJS](http://phantomjs.org/)

<h3>Python</h3>

* [urllib](https://docs.python.org/2/library/urllib.html)
* [urllib2](https://docs.python.org/2/library/urllib2.html)
* [Scrapy](http://scrapy.org/)

<h3>Perl 5</h3>

* [LWP::Simple](https://metacpan.org/pod/LWP::Simple)
* [LWP::UserAgent](https://metacpan.org/pod/LWP::UserAgent)
* [WWW::Mechanize](https://metacpan.org/pod/WWW::Mechanize)
* [WWW::Spyder](https://metacpan.org/pod/WWW::Spyder)
* [WWW::Crawler::Lite](https://metacpan.org/pod/WWW::Crawler::Lite)
* [WWW::Crawler::Mojo](https://metacpan.org/pod/WWW::Crawler::Mojo)
* [Web::Query](https://metacpan.org/pod/Web::Query)
* [Mojo::UserAgent](https://metacpan.org/pod/Mojo::UserAgent) и [mojo-crawler](http://blogs.perl.org/users/stas/2013/01/web-scraping-with-modern-perl-part-1.html) and [yada-crawler](https://gist.github.com/creaktive/4607326)
* [Scrappy](https://metacpan.org/pod/Scrappy)
* [Web::Scraper](https://metacpan.org/pod/Web::Scraper)
* [Web scraping with HTML::TreeBuilder](https://perlmaven.com/pro/web-scraping-with-html-treebuilder)
* [A Simple way to download many web pages using Perl: LWP::Simple and HTTP::Tiny](https://perlmaven.com/simple-way-to-fetch-many-web-pages)
* [Fetching several web pages in parallel using AnyEvent](https://perlmaven.com/fetching-several-web-pages-in-parallel-using-anyevent)

<h3>Ruby</h3>

  <l">[mechanize](https://rubygems.org/gems/mechanize)
* [excon](https://rubygems.org/gems/excon)
* [httparty](https://rubygems.org/gems/httparty)
* [httpclient](https://www.ruby-toolbox.com/projects/httpclient)
* [curb](https://www.ruby-toolbox.com/projects/curb)
* [Typhoeus](https://www.ruby-toolbox.com/projects/typhoeus)
* [Patron](https://www.ruby-toolbox.com/projects/patron)


## Альтернатива: Common Crawl

[Common Crawl](http://commoncrawl.org/)

## Книги

* [Web Scraping with Python](http://shop.oreilly.com/product/0636920034391.do)
* [Web Client Programming with Perl](http://www.oreilly.com/openbook/webclient/)

## Другое

* [Scraping Hub](http://scrapinghub.com/) is scraping as a service.
* [DeepCrawl](https://www.deepcrawl.com/)


