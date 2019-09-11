const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, './src/app.ts')
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
          test: /\.html$/,
          use: 'html-loader',
          exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './public/scripts'),
        chunkFilename: 'chunks/[name].js'
    },
    optimization: {
        splitChunks: {
          chunks: 'all'
        }
    }
};
