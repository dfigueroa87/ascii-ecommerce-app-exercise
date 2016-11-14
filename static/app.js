'use strict';

const app = angular.module('asciiApp', [
  'angularGrid',
  'APIService'
]);

app.constant('constants', {
  pageSize: 20,
  defaultSort: 'id',
  sortOptions: ['id', 'price', 'size'],
  modAds: 16,
});
