'use strict';

angular.module('asciiApp').controller('gridController', ['$scope', 'productsService',
  function ($scope, productsService) {
    $scope.products;
    let products;
    const pageSize = 20;
    let currentPage = 1;
    $scope.end = false;

    productsService.getProducts({}).$promise.then(response => {
      products = response;
      $scope.products = products.concat([]);
    });

    $scope.loadMore = () => {
      productsService.getProducts({
        skip: pageSize * currentPage,
      }).$promise.then(nextPageData => {
        if (!nextPageData.length) $scope.end = true;
        $scope.products = $scope.products.concat(nextPageData);
        currentPage++;
      });
    };

    $scope.sortBy = field => {
      productsService.getProducts({
        sort: field,
      }).$promise.then(response => {
        $scope.products = response;
        currentPage = 1;
      });
    };
  }
]);
