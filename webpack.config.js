const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const extensionConfig = {
    target: "node",
    entry: './src/extension/index.js',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'extension'),
        libraryTarget: 'commonjs2'
    },
    mode: 'production',
    devtool: 'source-map',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {modules: 'commonjs'}
                            ]
                        ],
                        plugins: ['add-module-exports']
                    }
                }
            }
        ]
    },
    performance: {
        hints: false
    }
};

const dashboardConfig = {
    entry: {
        connect: ['./src/dashboard/connect.jsx'],
        controls: ['./src/dashboard/controls.jsx'],
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dashboard')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'connect.html',
            title: 'Connect',
            template: './src/dashboard/_template.html',
            chunks: ['connect']
        }),
        new HtmlWebpackPlugin({
            filename: 'controls.html',
            title: 'Controls',
            template: './src/dashboard/_template.html',
            chunks: ['controls']
        })
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    mode: 'production'
};

module.exports = [
    extensionConfig,
    dashboardConfig
];
