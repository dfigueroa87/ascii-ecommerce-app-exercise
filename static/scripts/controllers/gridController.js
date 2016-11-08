'use strict';

angular.module('asciiApp').controller('gridController', ['$scope', 'productsService', 'constants',
  function ($scope, productsService, constants) {
    $scope.products;
    let products;
    const pageSize = constants.pageSize;
    const modAds = constants.modAds;
    let currentSort = constants.defaultSort;
    let currentPage = 1;
    let lastRandom = 0;
    $scope.end = false;

    productsService.getProducts({}).$promise.then(response => {
      products = response;
      $scope.products = products.concat([]);
    });

    /* So ads don't get repeated perform same processing as the backend */
    const validRandom = (number) => (number % modAds) !== (lastRandom % modAds);

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
      productsService.getProducts({
        skip: pageSize * currentPage,
        sort: currentSort,
      }).$promise.then(nextPageData => {
        if (!nextPageData.length) {
          $scope.end = true;
          return;
        }
        $scope.products.push(generateAd());
        $scope.products = $scope.products.concat(nextPageData);
        currentPage++;
      });
    };

    $scope.sortBy = field => {
      productsService.getProducts({
        sort: field,
      }).$promise.then(response => {
        currentSort = field;
        $scope.products = response;
        currentPage = 1;
        $scope.end = false;
      });
    };
  }
]);
