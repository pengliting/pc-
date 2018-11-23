
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  //入口起点
  entry: ['./src/js/index.js', './src/index.html'],
  //输出
  output: {
    path: resolve(__dirname, './build'),
    filename: './js/built.js'
  },
  //loader
  module: {
    rules: [
      {
        test: /\.less$/,  // 匹配文件的规则，说明loader对哪些文件生效
        use: [{  //从右往左依次同步执行
          loader: "style-loader" // 创建一个style标签，将js中的css放入其中
        }, {
          loader: "css-loader" // 将css以commonjs语法打包到js中
        }, {
          loader: "less-loader" // 编译less为css
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,   // 8kb以下的图片会做base64处理
              publicPath: '../images',  //修改样式中url图片路径
              outputPath: 'images',  //图片最终输入的路径
              name: '[hash:10].[ext]'  //hash 文件哈希值（可以指定位数）  ext 文件扩展名
            }
          }
        ]
      },
      {
        test: /\.js$/, // 涵盖 .js 文件
        enforce: "pre", // 预先加载好 jshint loader
        exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
        use: [
          {
            loader: "jshint-loader",
            options: {
              // 查询 jslint 配置项，请参考 http://www.jshint.com/docs/options/
              // 例如
              camelcase: true,
              //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
              //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
              emitErrors: true,
              //jshint 默认情况下不会打断webpack编译
              //如果你想在 jshint 出现错误时，立刻停止编译
              //请设置 failOnHint 参数为true
              failOnHint: true,
              esversion: 6
              // 自定义报告函数
              // reporter: function(errors) { }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'   //以指定文件为模板文件，创建新文件，新文件会将打包的资源全部引入
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  /*
    1. 下载包 webpack-dev-server@2  全局安装和本地安装
    2. 通过 webpack-dev-server 指令启动热模替换功能
    
    热模替换功能要求所有的资源都必须通过loader加载，否则就解析不了
   */
  devServer: {
    contentBase: './build',
    hot: true, //开启热模替换功能
    port: 3000,
    open: true  //自动打开浏览器
  },
};