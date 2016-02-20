module.exports = function() {

	return {

		restrict: "E",
		templateUrl: "views/directives/loginMenu.html",
		scope: {
			user: "="
		},

		controller: function ($scope, $location) {
			"ngInject";

			$scope.location = $location;
		}
	};
};
