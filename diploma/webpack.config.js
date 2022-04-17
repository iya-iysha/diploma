const path = require('path');
const webpack = require('webpack');

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
    entry: './src/index.tsx',
    devServer: {
        static: path.join(__dirname, 'public'),
        // compress: true,
        port: 9000,
        // process: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            App: srcPath('App'),
            constants: srcPath('constants'),
            pages: srcPath('pages'),
            types: srcPath('types'),
        }
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
    },
    mode: "development",   
};