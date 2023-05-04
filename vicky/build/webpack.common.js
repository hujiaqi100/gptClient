const path = require('path')
// const CleanWebpack = require('clean-webpack-plugin')
const LodashWebpack = require('lodash-webpack-plugin')
const webpack = require('webpack')
const ROOT = path.resolve(__dirname);
const devConfig = require('./webpack.dev')
const { VueLoaderPlugin } = require("vue-loader");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const prodConfig = require('./webpack.prod')
const webpackMerge = require('webpack-merge')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { ModuleFederationPlugin } = require("webpack").container
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
// const AddAssetHtml = require('add-asset-html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');

const _ = require('lodash')
// const HappyPack = require('happypack')
// const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
// const WorkBox = require('workbox-webpack-plugin')
// const handler = (percentage, message, ...args) => {
//     console.info(Math.round(percentage * 100) + '%', message, ...args);
// };
const commonConfig = {
    // entry: {
    //     app: path.resolve(__dirname, '../src/index.js')
    // },
    performance: false,
    plugins: [
        // new CompressionPlugin({
        //     filename: "[path][base].gz",
		// algorithm: 'gzip',
	    // test: /\.(js)$/,
        //    // test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
        //    threshold: 10240,
        //     minRatio: 0.8,
        //    // deleteOriginalAssets: false
        // }),
        // new ModuleFederationPlugin({
        //     name: "app",
        //     remotes: {
        //         vueClone: "vueClone@[vueCloneUrl]/remoteEntry.js",
        //         netfixClone: "netfixClone@[netfixCloneUrl]/remoteEntry.js",
        //         reactClone: "reactClone@[reactCloneUrl]/remoteEntry.js"
        //     },
        //     shared: ['react', 'react-dom', 'vue']
        // }),
        // new ExternalTemplateRemotesPlugin(),
        // new AddAssetHtml({
        //     filepath: path.resolve(ROOT, '../dll/vendors.dll.js')
        // }),
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(ROOT, '../dll/vendors.manifest.json')
        // }),

        // new CleanWebpack(['dist'], {
        //     root: path.resolve(ROOT, '../')
        // }),
        // new VueLoaderPlugin(),
        // }),
        // new WorkBox.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
        // new HappyPack({
        //     id: 'babel',
        //     use: ['babel-loader']
        // }),
        // new ESBuildPlugin()
    ],
    module: {
        rules: [
            // {
            //     test: /\.vue$/i,
            //     loader: 'vue-loader'
            // },
            {
                test: /\.ts[x]?$/,
                exclude: /(node_modules)/,
                use: ['ts-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                // use: ['happypack/loader?id=babel']
                use: ['babel-loader'],
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     loader: 'esbuild-loader',
            //     options: {
            //         loader: 'jsx',
            //         target: 'es2015',
            //         jsxFactory: 'React.createElement',
            //         jsxFragment: 'React.Fragment'
            //     },
            // },
            // {
            //     test: /\.(js|jsx)$/,
            //     loader: 'esbuild-loader',
            //     options: {
            //         loader: 'jsx',
            //         target: 'es2015',
            //         jsx: 'automatic',
            //     },
            // },
            {
                test: /\.(png|jpg|woff|woff2?|eot|ttf|otf|svg)$/,
                exclude: /(node_modules)/,
                use: ['url-loader?limit=8192']
            }
        ],

    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.wasm'],
        alias: {
            '@': ROOT + '/src'
        }
    }
}
module.exports = (env, args) => {
    if (_.get(args, 'mode', '') === 'production') {
        return webpackMerge(commonConfig, prodConfig)
    } else {
        return webpackMerge(commonConfig, devConfig)
    }
}
