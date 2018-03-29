/**
 * Created by zhijie.huang on 2017/7/19.
 */

const del = require('del'),
    gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    browserSync = require('browser-sync'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config'),
    reload = browserSync.reload;

const OUTPUT_PATH = 'dist',
    INDEX_PATH = 'dist/index.html';

gulp.task('default', ['serve', 'webpack'], () => {

});

gulp.task('webpack', function(cb) {
    webpack(webpackConfig , cb);
/*     // 如果不传 callback 回调函数，就会返回一个 Compiler 实例，用于让你去控制启动，而不是像上面那样立即启动
    const compiler = webpack(webpackConfig);

    // 调用 compiler.watch 以监听模式启动，返回的 watching 用于关闭监听
    const watching = compiler.watch({
        // watchOptions
        aggregateTimeout: 300,
    },(err, stats)=>{
        // 每次因文件发生变化而重新执行完构建后
    });

    // 调用 watching.close 关闭监听 
    watching.close(()=>{
        // 在监听关闭后
    });

    cb(); */
});

// 监视文件改动并重新载入
gulp.task('serve', ['createIndex'], function() {
    console.log('task serve running');

    browserSync({
        server: {
            baseDir: OUTPUT_PATH
        }
    });

    // gulp.watch(['src/**', '!src/webpack', '!src/webpack/**', 'dist/webpack/**'], ['reload'], function(cb) {
    //     cb();
    // });

    gulp.watch(['src/**'], ['reload'], function(cb) {
        cb();
    });
});

gulp.task('reload', ['createIndex'], function () {
    reload();
});

gulp.task('clean', function(cb) {
    del(['dist/**/*']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('copy', ['clean'], () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest(OUTPUT_PATH));
});

/**
 *  生成index.html
 *  依赖 copy/webpack
 */
gulp.task('createIndex', ['copy', 'webpack'], function(cb) {
    return createIndex().then((data) => {
        // console.log(data);
    }).catch((err) => {
        console.log('task createIndex error: ' + err);
    })
});

function createIndex() {

    function createIndexTemp() {
        let links = [], num = 0;
        const files = fs.readdirSync(OUTPUT_PATH);

        files.map((file) => {
            // console.log('--- file = ' + file);

            const stat = fs.statSync(path.join(OUTPUT_PATH, file));
            if (stat.isDirectory() && file.match(/webpack/)) {
                // console.log('--- dir = ' + JSON.stringify(stat));
                const insideFiles = fs.readdirSync(path.join(OUTPUT_PATH, file));
                insideFiles.map((insideFile) => {
                    if (insideFile.match(/webpack\d+\.html/)) {
                        num++;
                        links.push(`${num}. <a href="./webpack/${insideFile}">${insideFile}</a>`);
                        console.log('Get file ' + insideFile);
                    }
                });
            } else if (file.match(/demo\d+\.html/)) {
                num++;
                links.push(`${num}. <a href="./${file}">${file}</a>`);
                console.log('Get file \x1b[32m' + file +'\x1b[0m');
            }
        })
        links = links.join('</br>');

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>home page</title>
        </head>
        <body>
            <h1>canvas-demo homepage</h1>
            ${links}
        </body>
        </html>`
    }

    return new Promise((resolve, reject) => {
        const template = createIndexTemp();
        fs.writeFile(INDEX_PATH, template, function(err) {
            if (err) {
                reject(err);
            }
            resolve('file saved success!');
        })
    })
}