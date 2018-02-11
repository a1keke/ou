    let path = require('path');
    let webpack = require('webpack');
    module.exports = {
        entry: {
            // jianshu:path.resolve(__dirname,'src/jianshu/app.js'),
            // biquge:path.resolve(__dirname,'src/biquge/app.js'),
            // bookDetail:path.resolve(__dirname,'src/biquge/bookDetail.js'),
            // readPage:path.resolve(__dirname,'src/biquge/readPage.js')
            diary:path.resolve(__dirname,'src/diary/app-diary.js'),
            root:path.resolve(__dirname,'src/root/app-root.js'),
            kele:path.resolve(__dirname,'src/kele/app.js')
        },
        output: {
            path: path.resolve(__dirname,'static'),
            filename: '[name].js',
            publicPath: '/static/'
        },
        module: {
            rules: [
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: ['url-loader?limit=8192&name=/resource/[hash].[ext]'],
                },
                {
                    test: /\.(mp4|ogg|svg)$/,
                    use: ['file-loader?name=[hash].[ext]']
                },
                {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    use: ['url-loader?limit=10000&=application/font-woff&name=[hash].[ext]'],
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: ['url-loader?limit=10000&=application/octet-stream&name=[hash].[ext]']
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: ['file-loader?name=[hash].[ext]\'']
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: ['url-loader?limit=10000&=image/svg+xml&name=[hash].[ext]']
                },
                {
                    test:/(\.jsx|\.js)$/,
                    use:{loader: 'babel-loader'}
                },
                {
                    test:/\.css$/,
                    use:[
                        {loader: "style-loader"},
                        {loader: "css-loader", options: {modules:true}}
                    ]
                },
                {
                    test:/\.scss$/,
                    use:[
                        {loader: "style-loader"},
                        {loader: "css-loader", options: {modules:true}},
                        {loader: "sass-loader"}
                    ]
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                React: 'react',
                ReactDOM: 'react-dom',
                PT: 'prop-types'
            }),
    /* 		new webpack.DllReferencePlugin({
              context: __dirname,
              manifest: require('./static/vendors-manifest.json')
            })， */
            // new webpack.optimize.UglifyJsPlugin({
            //   compress: {
            // 	warnings: false
            //   }
            // })
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.optimize.CommonsChunkPlugin('common'), // 默认会把所有入口节点的公共代码提取出来,生成一个common.js
        ],
        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, '/src'),
                path.resolve(__dirname, '/dist'),
                path.resolve(__dirname, '/src/common'),
                path.resolve(__dirname, '/src/components'),
                path.resolve(__dirname, '/src/layout'),
                path.resolve(__dirname, '/src/view'),
                path.resolve(__dirname, '/'),
                path.resolve(__dirname, '/semantic'),
            ]
        },
        watch: true
    }