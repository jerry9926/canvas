/**
 * Created by zhijie.huang on 2017/7/19.
 */

const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    gulp.watch(['src/js/**'], ['babel']);
});

gulp.task('babel', () => {
    return gulp.src('src/js/demo05.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});
