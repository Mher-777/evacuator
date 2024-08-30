// =========================================================
// Gulp Task: JS
// =========================================================

let path = require("../settings/path.json"),
	webpackStream = require("webpack-stream"),
	strip = require("gulp-strip-comments");

module.exports = (gulp, plugins, browserSync) => {
	return () => {
		let errorHandler = plugins.notify.onError("<%= error.message %>");
		var reload = browserSync.reload;
		var stream =
			// -------------------------------------------- Start Task
			gulp
				.src(path.src.js, {sourcemaps: app.isDev})
				.pipe(plugins.plumber({ errorHandler }))
				.pipe(
					webpackStream({
						mode: app.isBuild ? "production" : "development",

						output: {
							filename: "app.js",
						},
						// module: {
						// 	rules: [
						// 		{
						// 			test: /\.js$/,
						// 			exclude: /node_modules\/(?!bullets-js)/,
						// 			use: {
						// 				loader: 'babel-loader',
						// 				options: {
						// 					presets: ["@babel/preset-env"]
						// 				}
						// 			}
						// 		}
						// 	]
						// }
					})
				)
				.pipe(plugins.if(app.isDev, strip()))
				.pipe(plugins.if(!app.isDev, plugins.jsbeautifier()))
				.pipe(gulp.dest(path.build.js))
				.pipe(
					reload({
						stream: true,
					})
				);
		// ---------------------------------------------- End Task
		return stream;
	};
};
