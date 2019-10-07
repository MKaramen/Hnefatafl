const path = require('path');

module.exports = {
    entry: './assets/js/main.js',
    output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: "bundle.js",
    },
    mode: 'development',
    watch: true,
    devtool: 'source-map',
};