const path = require('path');

const config = {
    target: 'node',
    mode: 'development',
    entry: './src/index.js',
    devtool: 'source-map',
    stats: 'detailed',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },
};

module.exports = config;
