## Installatie
### Chocolatey (Windows)
http://chocolatey.org/

```
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin - See more at: http://chocolatey.org/#sthash.csOPcB7E.dpuf
```

### Node.js (+Npm) e.a.

```
cinst nodejs.install
cinst git
cinst compass
cinst ruby
```

### Yeoman (+Bower, + Grunt) e.a.

```
npm install yo -g
npm install generator-angular -g
```

Controle: `npm list -g`

## Opzetten Angular project

```
yo angular
```
met default waarden.

(evt. `npm install`)

Test:

```
grunt test
grunt server
```

(evt. 'CHROME_BIN' gebruikersvariabele toevoegen)

## Route toevoegen

```
yo angular:route myroute
```

automatisch:

 * controllers/myroute.js
 * views/myroute.html
 * koppeling in index.html naar myroute.js
 * test/spec/controllers/myroute.js
 
## Data-binding
UI -> model:

```html
<div class="well">
	<div ng-form class="form-inline" name="form1">
		<input type="text" name="firstname" ng-model="person.firstname" placeholder="voornaam"></input>
		<input type="text" name="lastname" ng-model="person.lastname" placeholder="achternaam"></input>
	</div>

	<code ng-show="person">{{person}}</code>
</div>
```

Model -> UI:

```html
<button class="btn" ng-click="person.firstname='Apu'; person.lastname='Nahasapeemapetilon'">Model->UI data binding</button>
```

Gebruikte directives: `ng-form`, `ng-model`, `ng-show` en `ng-click`

## Form-validatie a.h.v. directives

```html
<div class="alert alert-block" ng-show="!form1.$valid">
	<div ng-show="form1.lastname.$error.required">Achternaam verplicht</div>
	<div ng-show="form1.zip.$error.pattern">Postcode incorrect</div>
</div>

<input type="text" name="firstname" ng-model="person.firstname" placeholder="voornaam"></input>
<input type="text" name="lastname" ng-model="person.lastname" placeholder="achternaam" ng-required="true"></input>
<input type="text" name="zip" ng-model="person.zip" placeholder="postcode" ng-pattern="/^\d\d\d\d$/"></input>
```

Gebruikte directives: `ng-required` en `ng-pattern`

## Dependencies met Bower
[Swiss-Army-Knife of AngularJS tools](http://angular-ui.github.io/ui-utils/)

In bower.json:

```javascript
 "dependencies": {
 	...
    "angular-ui-utils": "~0.0.4"
  },
```

```
bower install
```

In index.html:

```html
<script src="bower_components/angular-ui-utils/modules/mask/mask.js"></script>
```

In app.js:

```javascript
angular.module('angular101SbApp', ['ui.mask'])
```

In myroute.html:

```html
<div class="well">
	<div ng-form  class="form-inline" name="form2">
		<input type="text" name="rrnr" ng-model="rrnr" ui-mask="99.99.99-999.99"></input>
	</div>

	<code ng-show="rrnr">{{rrnr}}</code>
</div>
```

## Custom directive

```
yo angular:directive sbColor
```

automatisch:

 * directives/sbColor.js
 * koppeling in index.html naar sbColor.js
 * test/spec/directives/sbColor.js
 
In sbColor.js:
 
```javascript
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
```

## Testing

### Fix tests


In karma.conf.js:

```javascript
files = [
	...
	'app/bower_components/angular-ui-utils/modules/mask/mask.js',
   ];
```

omdat ui.mask dependency is van angular101SbApp.

Geen functionaliteit in controller MyRouteCtrl, dus test legen.

### Test directive

sbColor.js:

```javascript
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

```

Uitvoeren testen:

```
grunt test
```