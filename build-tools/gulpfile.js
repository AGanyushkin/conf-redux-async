const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const Server = require('karma').Server

const BUILD_ROOT = '../build'
const DEV_HOST = 'localhost'
const DEV_PORT = 7777

gulp.task('webpack-dev-server', (callback) => {
    var compiler = webpack(require('./webpack.config'))
    new WebpackDevServer(compiler, require('./webpack-dev-server.config'))
        .listen(DEV_PORT, DEV_HOST, (err) => {
            if(err) throw new gutil.PluginError("webpack-dev-server", err)
            gutil.log("[webpack-dev-server]", `http://${DEV_HOST}:${DEV_PORT}/webpack-dev-server/index.html`)
            // keep the server alive or continue?
            callback()
        })
})

gulp.task("webpack", function(callback) {
    webpack(require('./webpack.config'), (err, stats) => {
        if(err) throw new gutil.PluginError("webpack", err)
        gutil.log("[webpack]", stats.toString({
            // output options
        }))
        callback()
    })
})

gulp.task('test', (done) => {
    new Server({
        configFile: path.join(__dirname, './karma.conf.js'),
        singleRun: true
    }, done).start()
})
