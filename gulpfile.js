let preprocessor = 'scss'; 
const { src, dest, parallel, series, watch } = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    del = require('del');

function startwatch() {
    watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
    watch('src/**/' + preprocessor + '/**/*', styles);
    watch('src/**/*.html').on('change', browserSync.reload);
    // watch('src/images/**/*', images);
}

function browsersync() {
	browserSync.init({ 
		server: { baseDir: 'src/' }, 
		notify: true, 
		online: true 
	})
}

function scripts() {
	return src([ 
		'src/js/script.js', 
		])
	.pipe(concat('script.min.js')) 
	.pipe(uglify()) 
	.pipe(dest('src/js/')) 
	.pipe(browserSync.stream()) 
}
function cleanimg() {
	return del('app/images/dest/**/*', { force: true }) // Удаляем всё содержимое папки "app/images/dest/"
}
function styles() {
	return src('src/' + preprocessor + '/styles.' + preprocessor + '')
	.pipe(eval(preprocessor)())
	.pipe(concat('styles.min.css')) 
	.pipe(autoprefixer({ overrideBrowserslist: ['last 4 versions'], grid: true })) 
	.pipe(cleancss( { level: { 1: { specialComments: 0 } } } ))
	.pipe(dest('src/css/')) 
	.pipe(browserSync.stream()) 
}
 
// function images() {
// 	return src('src/images/**/*') 
// 	.pipe(dest('src/images/')) 
// }
 
function buildcopy() {
	return src([ 
		'src/css/**/*.min.css',
		'src/js/**/*.min.js',
		'src/images/**/*',
		'src/**/*.html',
		], { base: 'src' })
	.pipe(dest('dist'))
}

function cleandist() {
	return del('dist/**/*', { force: true })
}
 
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
// exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, styles, scripts, /*images*/ buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);