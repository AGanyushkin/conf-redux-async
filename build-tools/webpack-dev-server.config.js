module.exports = {
    quiet: false,
    stats: { colors: true },
    publicPath: '/',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    proxy: {
        '/api': {
            target: 'http://localhost:7778',
            pathRewrite: {'^/api' : ''}
        }
    }
}
