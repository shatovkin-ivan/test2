let preprocessor = 'sass'; 
const { src, dest, parallel, series, watch } = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css');
 
function browsersync() {
	browserSync.init({ 
		server: { baseDir: 'src/' }, 
		notify: false, 
		online: true 
	})
}
 
function scripts() {
	return src([ 
		'src/js/script.js', 
		])
	.pipe(concat('src.min.js')) 
	.pipe(uglify()) 
	.pipe(dest('src/js/')) 
	.pipe(browserSync.stream()) 
}
 
function styles() {
	return src('src/' + preprocessor + '/styles.' + preprocessor + '')
	.pipe(eval(preprocessor)())
	.pipe(concat('src.min.css')) 
	.pipe(autoprefixer({ overrideBrowserslist: ['last 4 versions'], grid: true })) 
	.pipe(cleancss( { level: { 1: { specialComments: 0 } } } ))
	.pipe(dest('src/css/')) 
	.pipe(browserSync.stream()) 
}
 
function images() {
	return src('src/images/src/**/*') 
	.pipe(dest('src/images/dest/')) 
}
 
function buildcopy() {
	return src([ 
		'src/css/**/*.min.css',
		'src/js/**/*.min.js',
		'src/images/dest/**/*',
		'src/**/*.html',
		], { base: 'src' })
	.pipe(dest('app'))
}
 
// function cleandist() {
// 	return del('dist/**/*', { force: true })
// }
 
function startwatch() {
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
	watch('src/**/' + preprocessor + '/**/*', styles);
	watch('src/**/*.html').on('change', browserSync.reload);
	watch('src/images/src/**/*', images);
}
 
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
// exports.cleanimg = cleanimg;
exports.build = series(styles, scripts, images, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);