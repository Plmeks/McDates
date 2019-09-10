const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/app.ts'),
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public')
    }
};
