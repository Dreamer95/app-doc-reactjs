const webpack = require('webpack');
const paths = require('./config/paths');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const publicPath = '/';

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: ['@babel/polyfill', paths.appIndexJs],
    output: {
        path: paths.appBuild,
        filename: 'static/js/bundle.js',
        chunkFilename: '[name].js',
        publicPath: publicPath,
        crossOriginLoading: 'anonymous'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            Src: paths.appSrc,
            Assets: paths.appSrc + '/assets/',
            Components: paths.appSrc + '/components/',
            Modules: paths.appSrc + '/modules/',
            Services: paths.appSrc + '/services/'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                exclude: /\.module.(less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.module.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            camelCase: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './plugin-config/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                //Vendor chunk
                vendor: {
                    //Name of the chunk
                    name: 'vendor',
                    //Async + async chunks
                    chunks: 'all',
                    //Import file path containing node_modules
                    test: /node_modules/,
                    priority: 20
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    devServer: {
        hot: false,
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            SITE_URL: JSON.stringify('//localhost:8080/'),
            ASSETS_URL: JSON.stringify('http://localhost:8080/'),
            API_HOST: JSON.stringify('http://tuandv.antalyser.adxdev.vn/api/'),
            API_ID: JSON.stringify('10507'),
            PROJECT_ID: JSON.stringify('2E4WptU6ChYuajgVBHSJetVLa6FVQMRmK'),
            U_OGS: JSON.stringify('uogs_dev'),
            AUTH_ADX_DOMAIN: JSON.stringify('http://tuandv.ogs.adxdev.vn/'),
            ST_OGS: JSON.stringify('http://tuandv.st.ogs.adxdev.vn/'),
            ST_URL_UPLOAD: JSON.stringify('http://tuandv.st.antalyser.adxdev.vn'),
            APPLICATION_ENV: JSON.stringify('development')
        }),
        new HTMLWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            chunksSortMode: 'none'
        })
    ]
};
