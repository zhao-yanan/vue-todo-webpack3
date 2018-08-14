const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('MiniCssExtractPlugin');
const baseConfig = require('./webpack.config.base.js');

const isDev = process.env.NODE_ENV === 'development';

const devServer = {
    port: 8000,
        host: '0.0.0.0',   //可以通过localhost、127.0.0.1和内网IP访问
        overlay: {
        errors: true   //将错误显示在页面上
    },
    // open: true,        //启动webpack-dev-server时自动打开浏览器
    hot: true
};

const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env': {   //此处定义的变量在js文件可以使用
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HtmlWebpackPlugin()
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
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = webpackMerge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {

                            }
                        },
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
        plugins: [
            new ExtractTextWebpackPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({   //公共模块单独打包，与入口中名称对应
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ]
    });
}

module.exports = config;