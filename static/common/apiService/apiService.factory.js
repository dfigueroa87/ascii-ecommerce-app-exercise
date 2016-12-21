'use strict';

const APIService = angular.module('APIService', ['ngResource']);

APIService.factory('productsService', ['$resource', 'constants',
  function($resource, constants) {
    let url = '/api/products';
    return $resource(url, {
      /* Default params */
      limit: constants.pageSize,
    }, {
      getProducts: {
        method: 'GET',
        /* Tranform that ugly response into an array ;) */
        transformResponse: response => {
          let data = response.split('\n');
          data = data.map(el => el ? JSON.parse(el) : null).filter(el => el);
          return data;
        },
        isArray: true,
      }
    });
  }
]);
