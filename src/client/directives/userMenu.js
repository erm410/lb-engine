var _ = require("lodash");

module.exports = function($window, $http, $cookies) {
	"ngInject";

	return {

		restrict: "E",
		templateUrl: "views/directives/userMenu.html",
		scope: {
			user: "="
		},

		link: function (scope) {

			scope.admin = $cookies.get("admin") === "true";

			scope.logout = () => {
				var reload = _.bind($window.location.reload, $window.location);
				$http.post("logout").then(reload, reload);
				return false;
			};
		}
	};
};
