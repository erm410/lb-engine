var _ = require("lodash");

module.exports = function (grunt) {

	var clientSrc = "src/client/";
	var serverSrc = "src/server/";
	var clientJs = [clientSrc + "**/*.js"];
	var serverJs = [serverSrc + "**/*.js"];
	var testJs = ["test/**/*.js"];
	var allJs = [].concat(clientJs, serverJs, testJs);

	var filesToLint = [];
	var commonAnnotate = {
		expand: true,
		cwd: clientSrc,
		src: ["**/*.js"]
	};

	var commonCss = {
		expand: true,
		flatten: true,
		src: [
			"node_modules/bootstrap/dist/css/bootstrap.min.css",
			"node_modules/font-awesome/css/font-awesome.min.css",
			"node_modules/animate.css/animate.min.css",
			"node_modules/angular-material/angular-material.min.css"
		]
	};

	var commonFonts = {
		expand: true,
		flatten: true,
		src: [
			"node_modules/bootstrap/dist/fonts/*",
			"node_modules/font-awesome/fonts/*",
		]
	};

	var build = "build/";
	var dev = build + "dev/";
	var prod = build + "prod/";
	var devTarget = dev + "target/";
	var devPublic = devTarget + "public/";
	var devPublicJs = devPublic + "js/";
	var prodTarget = prod + "target/";
	var prodPublic = prodTarget + "public/";
	var prodPublicJs = prodPublic + "js/";

	var nmOut = "temp/node_modules/app/";
	var annotatedOut = "temp/annotated/node_modules/app/";
	var browserifyOut = "temp/browserify/";
	var serverOut = "node_modules/app";

	grunt.initConfig({

		watch: {

			js: {
				files: allJs,
				tasks: ["jshint:watch", "doneLint"],
				options: {nospawn: true}
			},

			clientJs: {
				files: clientJs,
				tasks: ["copy:nmDev", "browserify:dev", "copy:browserifyDev"],
			},

			clientResources: {
				files: [clientSrc + "**/*.html", clientSrc + "images/**"],
				tasks: ["copy:devResources"]
			},

			server: {
				files: [serverJs],
				tasks: ["copy:devServer"]
			},

			sass: {
				files: [clientSrc + "**/*.scss"],
				tasks: ["sass:dev"]
			}
		},

		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			watch: filesToLint,
			all: allJs
		},

		ngAnnotate: {

			prod: {
				files: [_.assign({
					dest: prod + annotatedOut
				}, commonAnnotate)]
			}
		},

		browserify: {

			dev: {
				src: dev + nmOut + "app.js",
				dest: dev + browserifyOut + "app.js"
			},

			annotatedProd: {
				src: prod + annotatedOut + "app.js",
				dest: prod + browserifyOut + "app.js"
			}
		},

		clean: {
			all: ["build"],
			dev: ["build/dev"],
			prod: ["build/prod"]
		},

		uglify: {
			prod: {
				src: prod + browserifyOut + "app.js",
				dest: prod + browserifyOut + "app.min.js",
				options: {
					sourceMap: true
				}
			}
		},

		copy: {

			nmDev: {
				files: [
					{
						expand: true,
						cwd: clientSrc,
						src: ["**/*.js"],
						dest: dev + nmOut
					}
				]
			},

			browserifyDev: {
				files: [{
					expand: true,
					cwd: dev + browserifyOut,
					src: ["app.js"],
					dest: devPublicJs
				}]
			},

			browserifyProd: {
				files: [{
					expand: true,
					cwd: prod + browserifyOut,
					src: ["app.js", "app.min.js", "app.min.js.map"],
					dest: prodPublicJs
				}]
			},

			devResources: {
				files: [
					{
						expand: true,
						cwd: clientSrc,
						src: ["**/*.html", "images/**"],
						dest: devPublic
					},
					_.assign({dest: devPublic + "css/"}, commonCss),
					_.assign({dest: devPublic + "fonts/"}, commonFonts)
				]
			},

			devServer: {
				files: [
					{
						expand: true,
						cwd: serverSrc,
						src: ["**"],
						dest: devTarget + serverOut
					},
					{
						expand: true,
						cwd: serverSrc,
						src: ["server.js"],
						dest: dev + "temp/server/"
					}
				]
			}
		},

		sass: {
			dev: {
				files: {
					"build/dev/target/public/css/app.css" : clientSrc + "sass/app.scss"
				}
			},

			prod: {
				files: {
					"build/prod/target/public/css/app.css" : clientSrc + "sass/app.scss"
				}
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask("prod", ["clean:prod", "jshint:all", "ngAnnotate:prod", "browserify:annotatedProd", "uglify",
	"copy:browserifyProd", "sass:prod"]);
	grunt.registerTask("dev", ["clean:dev", "jshint:all", "copy:nmDev", "browserify:dev", "copy:browserifyDev",
	"copy:devResources", "sass:dev", "copy:devServer"]);

	grunt.registerTask("doneLint", "Resets the list of files to lint", function () {
		filesToLint = [];
		grunt.config(['jshint', 'watch'], filesToLint);
	});

	grunt.event.on('watch', (action, filepath) => {
		if (/\.js$/.test(filepath)) {
			filesToLint.push(filepath);
		}
	});

};
