'use strict';

angular.module('asciiApp').filter('date', () => (dateString) => {
  const theMoment = moment(new Date(dateString));
  const isLessThanAWeekBeforeNow = moment().subtract(7, 'days').isBefore(theMoment);
  return isLessThanAWeekBeforeNow ? theMoment.fromNow() : theMoment.format();
});
