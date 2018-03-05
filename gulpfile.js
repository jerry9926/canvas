/**
 * Created by zhijie.huang on 2017/7/19.
 */

const del = require('del');
const gulp = require('gulp');

gulp.task('default', () => {

});

gulp.task('clean', function(cb) {
    del(['dist/**/*']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('demo', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});
