'use strict';

/* Directive to listen scroll event and load more data when reaches the bottom of the page */
angular.module('asciiApp').directive('asciiInfiniteScroll', ['$window', function($window) {
  return {
    restrict: 'A',
    scope: {
      loadMore: '&asciiInfiniteScroll',
    },
    link: function(scope, element, attrs) {
      angular.element($window).bind('scroll', () => {
        const windowHeight = 'innerHeight' in window ?
          window.innerHeight	: document.documentElement.offsetHeight;
        const windowBottom = windowHeight + window.pageYOffset;
  			const body = document.body;
        const html = document.documentElement;
  		  const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,
  		    html.scrollHeight, html.offsetHeight);
        if (windowBottom >= docHeight) {
          scope.loadMore();
  			}
      });
    },
  };
}]);
