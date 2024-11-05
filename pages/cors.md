---
title: "Сайты с публичным API с CORS - Cross-Origin Resource Sharing"
timestamp: 2016-04-03T19:19:01
tags:
  - CORS
  - Access-Control-Allow-Origin
published: true
books:
  - angularjs
  - javascript
author: szabgab
original: cors
translator: name2rnd
archive: true
---


Изучая [AngularJS](/angularjs) или какие-то другие [JavaScript](/javascript)-фреймворки
для создания "Single Page" веб-приложений, не имея бекенда, вы можете добраться не слишком далеко.

Есть множество веб-сайтов с публичным API, который мы можем использовать, но большинство из них имеют
настройку безопасности CORS по умолчанию (не выставляя <b>Access-Control-Allow-Origin</b>), это значит, что
мы можем работать с их API из командной строки или с сервера, но не из браузера.

На этой странице вы найдете подборку веб-сайтов, предоставляющих API с настройкой Access-Control-Allow-Origin.
Вы можете использовать их для получения данных через Ajax-запросы.


<script src="/javascripts/angular.min.js"></script>

<script>
angular.module('CORSApp', [])
    .controller('CORSController', function($scope, $http) {
        //var url = '';
        // XMLHttpRequest cannot load http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q=jeniffer+garner.
        // No 'Access-Control-Allow-Origin' header is present on the requested resource.
        //var url = 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json';
        //var url = 'https://api.smartsheet.com/2.0/sheets';
        //var url = 'http://public-api.wordpress.com/rest/v1/sites';
        $scope.clear = function() {
            console.log('clear');
            $scope.data = '';
            $scope.error = 0;
        }
        $scope.try = function() {
            $http.get($scope.url).then(
                function(response) {
                    console.log(response);
                    $scope.data = response.data;
                },
                function(response) {
                    console.log("error");
                    console.log(response);
                    $scope.error = 1;
                }
            );
        }
    });
</script>

<div ng-app="CORSApp" ng-controller="CORSController">
    <select ng-model="url" ng-change="clear()">
        <option value="http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q=jeniffer+garner">IMDB (не работает)</option>
        <option value="https://api.github.com">GitHub</option>
        <option value="http://api.metacpan.org/v0/release/_search?size=10">MetaCPAN</option>
        <option value="http://api.openweathermap.org/data/2.5/weather?q=Budapest">OpenWeatherMap</option>
        <option value="https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&format=json&api_key=6f93d9bd5fef5831ec592f0b527fdeff&user_id=9395899@N08">Flickr</option>
    <select>
    <button ng-click="try()">Try</button>
    URL: {{url}}
    <hr>
    Result: {{ data }}
    <div ng-show="error" id="error">Failed</div>
</div>

Пример для Flickr https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&format=json&api_key=API_KEY&user_id=USER_ID
Вы можете получить ключ для API здесь: [App Garden](https://www.flickr.com/services/), 
а найти user_id по username вот здесь: [Flickr username finder](https://www.flickr.com/services/api/explore/flickr.people.findByUsername).

Здесь много [сайтов с публичным API](http://www.programmableweb.com/apis/directory), но большинство из них
не будут работать при попытке доступа из браузера. (Они не устанавливают Access-Control-Allow-Origin)

Прим. переводчика: здесь немного подробнее описана технология CORS https://ru.wikipedia.org/wiki/Cross-origin_resource_sharing
