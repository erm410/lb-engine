var express = require('express');
var auth = require('app/routes/auth');
var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var _ = require("lodash");

passport.serializeUser((user, done) => done(null, JSON.stringify(user)));

passport.deserializeUser((json, done) => done(null, JSON.parse(json)));

function pickUserFields(accessToken, refreshToken, profile, cb) {
	cb(null, _.pick(profile, "displayName", "id"));
}

function configureStrategy(name) {
	var upper = name.toUpperCase();
	return {
		clientID: process.env[upper + "_CLIENT_ID"],
		clientSecret: process.env[upper + "_CLIENT_SECRET"],
		callbackURL: "auth/" + name + "/callback"
	};
}

passport.use(new googleStrategy(configureStrategy("google"), pickUserFields));

passport.use(new facebookStrategy(_.assign({enableProof: true}, configureStrategy("facebook")),pickUserFields));

var router = express.Router();

router.use("/google", auth(passport.authenticate("google", {
	scope: "https://www.googleapis.com/auth/plus.me"
})));

router.use("/facebook", auth(passport.authenticate("facebook")));

module.exports = router;
