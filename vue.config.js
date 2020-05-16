const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TransformPages = require('uni-read-pages');

const tfPages=new TransformPages({
  includes:['path','name','meta','style']
});
const productionGzipExtensions = ['js', 'css'];
module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        // filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配文件名
        threshold: 10240,//对10K以上的数据进行压缩
        minRatio: 0.8,
        deleteOriginalAssets:false,//是否删除源文件
      }),
      new tfPages.webpack.DefinePlugin({
        ROUTES: JSON.stringify(tfPages.routes)
      })
    ]},
  transpileDependencies:['uni-simple-router','uni-hold-tabbar']
};
