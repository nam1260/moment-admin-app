const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


module.exports = {
    devServer : {
        hot: true,
    },
    mode: 'development', // or production
    entry: ['@babel/polyfill','./src/main.js','./src/main.css'],
 /*   resolve: {
        alias: {
            jquery: path.resolve(__dirname, 'src/plugins/jquery.min.js'),
         //   jqueryNew: path.resolve(__dirname, 'src/js/jquery-2.2.4.js'),
        }
    },*/
    output: {
        // 아웃풋 파일 이름 지정
        filename: 'main.js',
        path: path.resolve('./dist')

    },
    devtool: 'ource-map',
    plugins: [

        new webpack.ProvidePlugin({
          $: "jquery",
           jQuery: "jquery"
        }),
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'main.css' }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // src/index.html 파일을 읽는다.
            filename: 'index.html' ,// output으로 출력할 파일은 index.html 이다.
            hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
    ],
    module: {
        rules: [

            //file-loader
            {
                test: /\.(png|jpe?g|gif)$/i, // .css 확장자로 끝나는 모든 파일
                loader: 'file-loader',
                include: [
                    path.resolve('./src')
                ],
                options: {
                    name: 'assets/[contenthash].[ext]'
                },
                exclude: /node_modules/,
            },

            {
                test: /\.js$/, // .js 확장자로 끝나는 모든 파일 // 로딩에 적용할 파일 지정
                include: [
                    path.resolve('./src')
                ],
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/, // .css 확장자로 끝나는 모든 파일
                include: [
                    path.resolve('./src')
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    /*                 'style-loader',*/
                    'css-loader'
                ],
                exclude: /node_modules/,
            }
        ]
    },
    optimization : {
        minimizer : [
            new UglifyJsPlugin({
                cache: true,
                parallel: 4
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}