module.exports = function (config) {
    config.set({
        basePath: '../src/',
        frameworks: ['mocha', 'chai'],
        reporters: ['mocha', 'allure'],
        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        files: [
            '**/*-spec.js'
        ],
        preprocessors: {
            '**/*-spec.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.config.js'),
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-chai',
            'karma-sourcemap-loader',
            'karma-phantomjs-launcher',
            'karma-allure-reporter',
            'karma-mocha-reporter'
        ],
        allureReport: {
            reportDir: '../build/allure-results'
        }
    })
}
