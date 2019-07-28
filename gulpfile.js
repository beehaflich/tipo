
/* eslint-disable */

const { src, dest, watch, series, parallel } = require('gulp');


// const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

const JSPath = './src/**/*.js';
const testPath = './test/**/*.js';

function buildJavaScript() {
	return src(JSPath)
		.pipe(babel())
		.pipe(dest('./dist/'));
}

function lintJavaScript() {
	return src(JSPath)
		.pipe(eslint())
		.pipe(eslint.format());
		// .pipe(eslint.failAfterError());
}


function testJavaScript() {
	return src(testPath, {'read': false})
		.pipe(mocha({
			'require': ['@babel/register'],
		}));
}

function initWatcher(cb) {
	watch([JSPath, testPath], {}, buildJavaScript);
	watch(JSPath, {}, lintJavaScript);
	watch([JSPath, testPath], {}, testJavaScript);
}

exports.default = series(
	parallel(testJavaScript, lintJavaScript),
	buildJavaScript
);

exports.watch = initWatcher;
