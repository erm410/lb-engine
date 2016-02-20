var _ = require("lodash");

module.exports = function() {

	return {

		restrict: "E",
		templateUrl: "views/directives/userMenu.html",
		scope: {
			user: "="
		},

		controller: function ($scope, $window, $http, $cookies) {
			"ngInject";

			$scope.admin = $cookies.get("admin") === "true";

			$scope.logout = () => {
				var reload = _.bind($window.location.reload, $window.location);
				$http.post("logout").then(reload, reload);
				return false;
			};
		}
	};
};
