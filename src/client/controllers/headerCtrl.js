
module.exports = function ($scope, $cookies, $mdSidenav) {
	"ngInject";

	$scope.mdSidenav = $mdSidenav;
	$scope.user = $cookies.get("user");

};
