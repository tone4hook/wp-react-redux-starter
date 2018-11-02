// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const webpack = require('webpack'); // reference to webpack Object

// Including UglifyJS
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Including MiniCssExtract
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Including OptimizeCSS
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Including HtmlWebpack
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src')
};

// Webpack configuration
module.exports = {
    entry: [
        path.join(paths.SRC, 'index.js')
    ],
    output: {
        path: paths.DIST,
        filename: 'main.bundle.js'
    },
		devServer: {
		  historyApiFallback: true
		},
    // Tell webpack to use html plugin -> ADDED IN THIS STEP
    // index.html is used as a template in which it'll inject bundled app.
    plugins: [
			new UglifyJSPlugin(),
			new HtmlWebpackPlugin({
				title: 'React Redux template',
				template: 'index.php'
			}),
			new OptimizeCSSAssetsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css'
			})
    ],
    // Loaders configuration -> ADDED IN THIS STEP
    // We are telling webpack to use "babel-loader" for .js and .jsx files
    module: {
        rules: [
	        {
	        	test: /\.(js|jsx)$/,
	        	exclude: /node_modules/,
	        	use: [
	        		'babel-loader'
	        	],
	        },
	        {
	        	test: /\.(css|scss)$/,
	        	use: [
	        	MiniCssExtractPlugin.loader,
	        		'css-loader',
	        		'sass-loader',
	        	],
	        },
			{
				test: /\.(png|svg|jpg|gif|svg)$/,
				loader: 'file-loader',
			    options: {
			        name: 'img/[name].[ext]'
			    }
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader',
			    options: {
			        name: 'fonts/[name].[ext]'
			    }
			}
        ],
    },
      // Enable importing JS files without specifying their's extenstion -> ADDED IN THIS STEP
      //
      // So we can write:
      // import MyComponent from './my-component';
      //
      // Instead of:
      // import MyComponent from './my-component.jsx';
      resolve: {
        extensions: ['.js', '.jsx'],
    },
};