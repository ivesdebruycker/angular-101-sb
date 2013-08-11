'use strict';

describe('Controller: MyrouteCtrl', function () {

  // load the controller's module
  beforeEach(module('angular101SbApp', ['ui.mask']));

  var MyrouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyrouteCtrl = $controller('MyrouteCtrl', {
      $scope: scope
    });
  }));

});
