'use strict'

// TODO: evaluate testing
let hostname = 'localhost'
let port = 8080

module.exports = {
    entry: 'mocha!./tests/index.js',
    output: {
        filename: 'test.build.js',
        path: 'tests/',
        publicPath: 'http://' + hostname + ':' + port + '/tests'
    },
    module: {
        loaders: [
            {
                test: /.js/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015', 'es2017'],
                  plugins: [
                    'transform-runtime',
                    'transform-es2015-destructuring',
                    'transform-object-rest-spread',
                    'transform-async-to-generator'
                  ],
                },
            },
            {
                test: /(\.css|\.less)$/,
                loader: 'null-loader',
                exclude: [
                    /build/
                ]
            },
            {
                test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
                loader: 'null-loader'
            }
        ]
    },
    devServer: {
        host: hostname,
        port: port
    }
}
