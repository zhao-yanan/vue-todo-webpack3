const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

const devServer = {
    port: 8080,
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
            NODE_ENV: '"development"'
        }
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'template.html')
    })
];

let config = webpackMerge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
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
    devServer,
    resolve: {
        alias: {
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: defaultPlugin.concat([
        new webpack.HotModuleReplacementPlugin()
    ])
});

module.exports = config;