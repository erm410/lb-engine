var express = require('express');

function success(req, res) {
	res.cookie("user", req.user.displayName);
	if (req.user.id === "113603192160035432283") {
		res.cookie("admin", true);
	}
	res.redirect(req.session.return);
}

module.exports = function (passport) {

	var router = express.Router();

	router.get("/", (req, res, next) => {
		req.session.return = req.query.return;
		next();
	}, passport);

	router.get("/callback", passport, success);

	return router;
};
