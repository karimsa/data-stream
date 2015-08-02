/**
 * gulpfile.babel.js - data-stream
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import beautify from 'gulp-jsbeautifier';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('beautify', () =>
	gulp.src('lib/**/**.js')
		.pipe(beautify({
			js: {
				jslintHappy: true
			}
		}))
		.pipe(gulp.dest((dest) => dest.base))
);

gulp.task('default', ['beautify'], () =>
	gulp.src(['./lib/index.js', './lib/**/**.js'])
		.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(concat('index.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(''))
);