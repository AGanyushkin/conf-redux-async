module.exports = {
    presets: ['es2015', 'react'],
    plugins: [
        'transform-async-to-generator',
        'transform-regenerator',
        'transform-runtime',
        'transform-class-properties',
        'transform-object-rest-spread'
    ]
}
