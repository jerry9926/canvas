/**
 * Created by zhijie.huang on 2017/7/19.
 */
module.exports = {
    entry: __dirname + '/src/js/demo05.js',
    output: {
        path: __dirname + '/dist/js/',
        filename: 'demo05.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
