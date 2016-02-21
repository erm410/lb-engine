module.exports = function($cookies, $mdSidenav) {
	"ngInject";

	return {

		restrict: "E",
		templateUrl: "views/directives/header.html",
		scope: {},

		link: function (scope) {

			scope.mdSidenav = $mdSidenav;
			scope.user = $cookies.get("user");
		}
	};
};
