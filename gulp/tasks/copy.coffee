gulp    = require 'gulp'
changed = require 'gulp-changed'
paths   = require '../paths'


gulp.task 'copy:images', ->
	return gulp.src [
			'**/*.{png,jpg,gif}'
			'!sprite/**/*'
		],
			cwd: paths.appImages
		.pipe gulp.dest paths.images

gulp.task 'copy:resources', ->
	return gulp.src 'app/resources/**/*'
		.pipe changed paths.dist
		.pipe gulp.dest paths.dist

gulp.task 'copy:scripts', ->
	return gulp.src [
			'debug.js'
		],
			base: 'app/scripts'
			cwd: 'app/scripts'
		.pipe changed paths.scripts
		.pipe gulp.dest paths.scripts

gulp.task 'copy:css', ->
	return gulp.src [
			'swiper.min.css'
		],
			base: 'app/scripts/libs/Swiper/dist/css'
			cwd: 'app/scripts/libs/Swiper/dist/css'
		.pipe changed paths.styles
		.pipe gulp.dest paths.styles


gulp.task 'copy', ['copy:images', 'copy:resources', 'copy:scripts', 'copy:css']
