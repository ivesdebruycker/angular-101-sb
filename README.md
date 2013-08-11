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

bower.json:

```javascript
 "dependencies": {
 	...
    "angular-ui-utils": "~0.0.4"
  },
```

```
bower install
```
