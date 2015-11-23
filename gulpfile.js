import gulp from 'gulp';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';

const babelConfig = {
  stage: 0,
};

gulp.task('test', () => {
  return gulp.src('./tests/**/*.js')
  .pipe(babel(babelConfig))
  .pipe(mocha({
    timeout: 20000,
  }));
});

gulp.task('build', () => {
  return gulp.src('./src/**/*.{js,jsx}')
    .pipe(babel(babelConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.doneCallback = (err) => {
  process.exit(err ? 1 : 0);
};
