var angular = require('angular');
var app = angular.module("lbEngine");

app.directive("userMenu", require("app/directives/userMenu.js"));
app.directive("mainMenu", require("app/directives/mainMenu.js"));
app.directive("loginMenu", require("app/directives/loginMenu.js"));
app.directive("header", require("app/directives/header.js"));
