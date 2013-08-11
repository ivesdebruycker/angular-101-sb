'use strict';

describe('Directive: sbColor', function () {
  beforeEach(module('angular101SbApp'));

  var element;

  it('should not pass with invalid hex color', inject(function ($rootScope, $compile) {
  	element = angular.element(
      '<form name="form">' +
        '<input sb-color ng-model="color" name="colorinput"></input>' +
      '</form>'
    );
    element = $compile(element)($rootScope);

    $rootScope.form.colorinput.$setViewValue('#zzz');
    expect($rootScope.color).toBeUndefined();
    expect($rootScope.form.colorinput.$valid).toBe(false);

    $rootScope.form.colorinput.$setViewValue('aaff00');
    expect($rootScope.color).toBeUndefined();
    expect($rootScope.form.colorinput.$valid).toBe(false);
  }));

  it('should pass with invalid hex color', inject(function ($rootScope, $compile) {
  	element = angular.element(
      '<form name="form">' +
        '<input sb-color ng-model="color" name="colorinput"></input>' +
      '</form>'
    );
    element = $compile(element)($rootScope);

    $rootScope.form.colorinput.$setViewValue('#abc');
    expect($rootScope.color).toBe('#abc');
    expect($rootScope.form.colorinput.$valid).toBe(true);

    $rootScope.form.colorinput.$setViewValue('#aaff00');
    expect($rootScope.color).toBe('#aaff00');
    expect($rootScope.form.colorinput.$valid).toBe(true);
  }));
});
