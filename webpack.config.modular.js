/* ===========================================
 * This configuration maker is used to build
 * the application for running on the Tomcat
 * server in Spring. Spring is configured to
 * retrieve JS files from /js and HTML from
 * /WEB-INF/views. To accomodate this, the
 * index.js and index.html files are built
 * and placed in those directories respectively.
 * =========================================== */

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    makeProductionConfig: function() { return makeConfig(true); },
    makeDevelopmentConfig: function() { return makeConfig(false); },
};

function makeConfig(isProductionBuild) {
    const isDevelopmentBuild = !isProductionBuild; // helper variable for readability

    const config = {};

    config.mode = (isProductionBuild ? 'production' : 'development');

    config.resolve = { extensions: ['.js', '.jsx'] };   // Don't require js or jsx extensions for imports

    // == Entry & Output ======================
    config.entry = './src/index.js';           // Location of pre-bundled index.jsx
    config.output = {
        filename: 'js/build/index.js',          // Destination of output bundle
        path: path.resolve(__dirname, './'),    // Prepend this when injecting relative path for script tag
        publicPath: '/StaffReady/'
    };

    // == Optimization for production build ==
    if (isProductionBuild) {
        config.performance = {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        }
        config.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            ascii_only: true,       // fix bad encoding of &nbsp; and like symbols in JSX
                        },
                    },
                }),
            ],
        }
    }

    // == Plugins =============================
    let plugins = [];

    // CleanWebpackPlugin to automate removal of old build files
    plugins.push(
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['js/build/*','build/*'],
        })
    );

    // HtmlWebPackPlugin for emitting the app's index html
    plugins.push(
        new HtmlWebPackPlugin({
            filename: path.resolve(__dirname, './WEB-INF/views/build/index.html'),
            template: './src/index.html',
            inject: true,
        })
    );

    if (isProductionBuild) {
        // MiniCssExtractPlugin for production build to bundle CSS
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'build/[name].[contenthash].css',        // Use [name].[hash].css for production
                chunkFilename: 'build/[id].[contenthash].css',     // Use [id].[hash].css for production

                // TODO: Come up with a solution to prevent needing this flag (it suppresses some warnings)
                // somehow splitting the bundle caused ordering issues, though I haven't seen any actual effects of this...?
                ignoreOrder: true,
            }),
        );
    }

    // DefinePlugin for injecting custom variables into code on build
    plugins.push(
        new webpack.DefinePlugin({
            __ROUTER_BASENAME__: JSON.stringify('/StaffReady/v10'), // Custom variables to inject into code
            __WICKET_BASEURL__: isDevelopmentBuild ? JSON.stringify('http://localhost:8080') : JSON.stringify('')
        }),
    );


    config.plugins = plugins;

    // == Module Rules ========================
    let rules = [];

    rules.push({
        test: /\.jsx?$/,				// Process js and jsx files
        loader: 'babel-loader',	      	// Process using babel
        exclude: /node_modules(?!\/yup)/,  // Don't process node_modules (except for yup)
    });

    rules.push({
        test: /\.html$/,				// Process html files
        loader: 'html-loader',	      	// Process using html-loader
    });

    rules.push({
        test: /\.(sa|sc|c)ss$/,         // Process scss + css files
        exclude: /\.module.s[ac]ss$/,   // Exclude *.module.scss files
        use: [
            (isProductionBuild
                ? MiniCssExtractPlugin.loader   // Using MiniCssExtractPlugin.loader for production
                : 'style-loader'                // and style-loader for dev
            ),
            'css-loader',                       // and css-loader
            {
                loader: 'sass-loader',          // and sass-loader
                options: {
                    sourceMap: isDevelopmentBuild
                },
            },
        ],
    });

    rules.push({
        test: /\.(eot|svg|ttf|woff|gif|png)$/,  // Process misc resource files
        loader: 'url-loader',           // Process using url-loader
        options: {
        limit: 10 * 1024,             // 10KB embedded file limit
        outputPath: 'build',          // Put in resources folder
        name: '[name].[ext]',         // Keep file name
        },
    });

    config.module = {};
    config.module.rules = rules;

    // == Finish ==============================
    return config;
}