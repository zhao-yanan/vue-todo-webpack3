const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.base.js');

const isDev = process.env.NODE_ENV === 'development';

const devServer = {
    port: 8000,
    host: '0.0.0.0',   //可以通过localhost、127.0.0.1和内网IP访问
    overlay: {
        errors: true   //将错误显示在页面上
    },
    historyApiFallback: {
        index: '/index.html'
    },
    hot: true
};

const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env': {   //此处定义的变量在js文件可以使用
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'template.html')
    })
];

let config;

if (isDev) {
    config = webpackMerge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        devServer,
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'less-loader'
                    ]
                }
            ]
        },
        plugins: defaultPlugin.concat([
            new webpack.HotModuleReplacementPlugin()
        ])
    });
} else {
    config = webpackMerge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js')
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'less-loader'
                    ]
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: true
        },
        plugins: defaultPlugin.concat([
            new MiniCssExtractPlugin({
                filename: 'css/app.[name].css',
                chunkFilename: 'css/app.[contentHash:8].css'
            })
        ])
    });
}

module.exports = config;