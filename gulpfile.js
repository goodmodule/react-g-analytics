import gulp from 'gulp';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';

gulp.task('test', () => {
  return gulp.src('./tests/**/*.js')
  .pipe(babel())
  .pipe(mocha({
    timeout: 20000,
  }));
});

gulp.task('build', () => {
  return gulp.src('./src/**/*.{js,jsx}')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.doneCallback = (err) => {
  process.exit(err ? 1 : 0);
};
