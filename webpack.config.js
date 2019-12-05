const webpack = require('webpack')
const path = require('path')


module.exports = {
    mode: 'development',
    entry: {
        firstComp: './src/js/firstComp/index.js',
        vendor: ['react']
    },
    output: {
        path: path.resolve(__dirname,
            'public/js/components'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    }
}