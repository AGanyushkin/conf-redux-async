const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require("webpack")

module.exports = {
    entry: "../src/app/launcher.js",
    output: {
        path: path.join(__dirname, '../build/dist/'),
        filename: "bundle.[hash].js",
        chunkFilename: "[id].bundle.[hash].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: require('./babel.config')
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'resolve-url'],
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                loaders: ["style", "css", 'resolve-url', "sass"]
            },
            {
                test: /\.png$/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                test: /\.jpg$/,
                loader: 'file'
            },
            { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: path.join(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../src/app/static/loader.html')
        }),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map'
}
