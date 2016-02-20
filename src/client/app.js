var angular = require('angular');

var app = angular.module("lbEngine", [require("angular-ui-router"), require("angular-cookies"), require("angular-aria"),
require("angular-material")]);

require("app/controllers");
require("app/services");
require("app/routers");
require("app/directives");

app.config(($mdThemingProvider) => {
	$mdThemingProvider.theme("default").
		primaryPalette("light-green");
});
