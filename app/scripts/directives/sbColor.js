'use strict';

angular.module('angular101SbApp')
  .directive('sbColor', function () {
    return {
	    restrict: 'A',
	    require: 'ngModel',
	    // elem = the element the directive is on
	    // scope = the parent scope
	    // attr = a dictionary of attributes on the element
	    // ctrl = the controller for ngModel.
	    link: function postLink(scope, element, attrs, ctrl) {
	    	var hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

	      	// add a parser that will process each time the value is 
	        // parsed into the model when the user updates it.
	        ctrl.$parsers.unshift(function(value) {
	            // test and set the validity after update.
	            var valid = hexColorRegex.test(value);

	        	if (!valid) {
	        		switch(value)
					{
					case 'zwart':
						value = '#000';
					  	valid = true;
					  	break;
					case 'wit':
						value = '#fff';
					  	valid = true;
					  	break;
					default:
					}
	        	}
	            ctrl.$setValidity('hexColor', valid);
	            
	            // if it's valid, return the value to the model, 
	            // otherwise return undefined.
	            return valid ? value : undefined;
	        });
	    }
    };
});
