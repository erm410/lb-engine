module.exports = function($location) {
	"ngInject";

	return {

		restrict: "E",
		templateUrl: "views/directives/loginMenu.html",
		scope: {
			user: "="
		},

		link: function (scope) {
			scope.location = $location;
		}
	};
};
