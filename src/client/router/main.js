module.exports = function ($stateProvider) {
	"ngInject";

	$stateProvider.state("main", {
		url: "/",
		views: {
			header: {
				templateUrl: "views/header.html",
				controller: "headerCtrl"
			},
			left: {
				templateUrl: "views/left.html"
			},
			content: {
				templateUrl: "views/content.html"
			}
		}
	});
};
