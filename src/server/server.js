var express = require('express');
var session = require('express-session');
var passport = require('passport');
var app = express();

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("app/passport"));

app.post("/logout", (req, res) => {
	res.clearCookie("user");
	res.clearCookie("admin");
	res.redirect(req.query.return);
});

app.use(express.static(__dirname + "/../../public"));

var server = app.listen(4000, () =>	console.log("Server listening on %j", server.address()));
