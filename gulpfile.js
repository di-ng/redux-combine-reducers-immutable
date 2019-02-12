#!/usr/bin/env node

const gulp = require('gulp');
const changed = require('gulp-changed');
const typescript = require('gulp-typescript');
const logger = require('gulp-logger');
const mocha = require('gulp-mocha');
const merge = require('merge2');

const TEST_DIRECTORY = './test';

const tsProject = typescript.createProject('tsconfig.json', { declaration: true });

gulp.task('compile-ts', function () {
  const tsResult = tsProject.src()
    .pipe(changed('./lib/'))
    .pipe(logger({
      before: 'Starting compile...',
      after: 'Compile complete!'
    }))
    .pipe(tsProject())

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
    tsResult.dts.pipe(gulp.dest('lib')),
    tsResult.js.pipe(gulp.dest('lib'))
  ]);
});

gulp.start(['compile-ts']);

gulp.task('default', ['compile-ts']);

gulp.task('test', () => {
  process.env.NODE_ENV = 'test';
  // Run unit tests
  const testFiles = [
    TEST_DIRECTORY + '/**/*.spec.ts',
  ];
  return gulp.src(testFiles, { read: false })
    .pipe(mocha({
      require: 'ts-node/register',
      reporter: 'mocha-better-spec-reporter',
      timeout: 20000,
    }))
    .once('error', function (err) {
      if (err) { throw err; }
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});
