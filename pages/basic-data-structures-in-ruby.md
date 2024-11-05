---
title: "Простые типы данных в Ruby (Scalar, Array, Hash)"
timestamp: 2016-02-28T19:39:01
tags:
  - class
  - Fixnum
  - Float
  - String
  - Array
  - Hash
published: true
books:
  - ruby
author: szabgab
original: basic-data-structures-in-ruby
translator: name2rnd
archive: true
---


В Ruby есть три простых типа данных.

Scalars (скаляр) может содержать одиночное значение: число или строку.

Arrays (массив) это упорядоченный список скаляров (scalars).

Hashes это пары ключ-значение, где ключи уникальные строки, а значения это скаляры.


Метод `class` может сказать нам, какой тип значения содержится в переменной:

{% include file="examples/ruby/data_structures.rb" %}

