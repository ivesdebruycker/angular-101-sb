'use strict';

describe('Directive: sbColor', function () {
  beforeEach(module('angular101SbApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<sb-color></sb-color>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the sbColor directive');
  }));
});
