/**
 * Created by zhijie.huang on 2017/7/19.
 */

const gulp = require('gulp');

gulp.task('default', () => {

});

gulp.task('demo', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});
