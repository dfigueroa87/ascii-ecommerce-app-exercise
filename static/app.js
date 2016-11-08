'use strict';

const app = angular.module('asciiApp', [
  'angularGrid',
  'APIService'
]);

app.constant('constants', {
  pageSize: 20,
  defaultSort: 'id',
  modAds: 16,
});

app.filter('date', () => (dateString) => {
  const theMoment = moment(new Date(dateString));
  const isLessThanAWeekBeforeNow = moment().subtract(7, 'days').isBefore(theMoment);
  return isLessThanAWeekBeforeNow ? theMoment.fromNow() : theMoment.format();
});
