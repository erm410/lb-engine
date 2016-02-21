module.exports = function ($stateProvider, $urlRouterProvider) {
	"ngInject";

	$urlRouterProvider.otherwise("/");

	$stateProvider.state("main", {
		url: "/",
		views: {
			left: {
				templateUrl: "views/left.html"
			},
			content: {
				templateUrl: "views/content.html"
			}
		}
	});
};
