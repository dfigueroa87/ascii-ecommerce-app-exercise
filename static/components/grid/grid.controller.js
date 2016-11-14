'use strict';

angular.module('asciiApp').controller('asciiGridController', ['$scope', 'productsService', 'constants',
  function($scope, productsService, constants) {
    $scope.products = [];
    $scope.currentSort = constants.defaultSort;
    $scope.sortOptions = constants.sortOptions;
    let currentPage = 0;
    let lastRandom = -1;
    $scope.end = false;
    $scope.loading = true;
    let buffer;

    const loadBuffer = () => {
      $scope.loading = true;
      buffer = productsService.getProducts({
        skip: constants.pageSize * currentPage,
        sort: $scope.currentSort,
      }).$promise;
    };

    const addProducts = (products) => {
      $scope.products = $scope.products.concat(products);
      $scope.loading = false;
      currentPage++;
      loadBuffer();
    };

    /* Load products on init */
    productsService.getProducts({
      sort: $scope.currentSort,
    }).$promise.then(response => {
      addProducts(response);
    });

    const resetState = () => {
      currentPage = 0;
      lastRandom = -1;
      $scope.end = false;
      $scope.products = [];
    };

    /* So ads don't get repeated perform same processing as the backend */
    const validRandom = (number) => (number % constants.modAds) !== (lastRandom % constants.modAds);

    const generateRandom = () => {
      const random = Math.floor(Math.random()*1000);
      if (!validRandom(random)) return generateRandom();
      lastRandom = random;
      return random;
    };

    const generateAd = () => ({
      ad: true,
      random: generateRandom(),
    });

    $scope.loadMore = () => {
      if ($scope.end) return;
      buffer.then(nextPageData => {
        if (!nextPageData.length) {
          $scope.loading = false;
          $scope.end = true;
          return;
        }
        $scope.products.push(generateAd());
        addProducts(nextPageData);
      });
    };

    $scope.sortBy = (field) => {
      if ($scope.currentSort === field) return;
      $scope.currentSort = field;
      resetState();
      $scope.loading = true;
      productsService.getProducts({
        sort: field,
      }).$promise.then(response => {
        addProducts(response);
      });
    };
  }
]);
