/**
 * Created by zhijie.huang on 2017/7/19.
 */
const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENTRY_PATH = 'src/webpack/js/';
const TPL_PATH = 'src/webpack/';
const OUT_PATH = 'dist/webpack/';

function getTemplate(str) {
    /*if (str.match(/bar/)) {
        return 'tml-bar';
    } else if (str.match(/map/)) {
        return 'tml-map';
    }*/
    return str;
}

function getEntry(aPath) {
    const files = fs.readdirSync(aPath, 'utf8');
    const webpackEntry = {};

    files.map(function(item) {
        if (item.match(/demo/)) {
            const chunks = path.basename(item, '.js');
            webpackEntry[chunks] = path.join(__dirname, ENTRY_PATH, item);
        }
    });

    return webpackEntry;
}

function getPlugin(aPath) {
    const files = fs.readdirSync(aPath, 'utf8');
    const webpackPlugin = [];

    files.map(function(item) {
        // console.log('tml:' + item);
        if (item.match(/demo/)) {
            const template = path.join(__dirname, TPL_PATH, getTemplate(item));
            const chunks = path.basename(item, '.html');
            const filename = item;

            webpackPlugin.push(new HtmlWebpackPlugin({
                template: template,
                chunks: [chunks],
                filename: filename
            }))
        }
    });

    // HMR（Hot Module Replacement）热模块替换
    webpackPlugin.push(new webpack.HotModuleReplacementPlugin());

    return webpackPlugin;
}

// console.info('call get webpackEntry', getEntry(ENTRY_PATH));
// console.info('webpackPlugin', getPlugin(TPL_PATH));

module.exports = {
    entry: getEntry(ENTRY_PATH),
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, OUT_PATH)
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true,
        hot: true
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
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },
    plugins: getPlugin(TPL_PATH)
};
