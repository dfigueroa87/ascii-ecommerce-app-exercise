'use strict';

describe('date filter', function() {
  let $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return relative date when date is within a week', function() {
    const filter = $filter('date');
    const date = new Date();
    date.setDate(date.getDate() - 2);
    expect(filter(date.toString())).toEqual('2 days ago');
  });

  // THESE ARE ALL THE TESTS INCLUDED IN FREE VERSION. :P
  // TODO: Install and configure Karma. Then add more tests, for everything.
});
