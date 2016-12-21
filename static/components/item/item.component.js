'use strict';

/* Simple component having the template for a single item in a grid */
angular.module('asciiApp').component('asciiItem', {
  templateUrl: 'components/item/item.view.html',
  bindings: {
    product: '<',
  },
});
