var angular = require('angular');
var app = angular.module("lbEngine");

app.config(function ($urlRouterProvider) {
	"ngInject";

	$urlRouterProvider.otherwise("/");
});

app.config(require("app/router/main"));
