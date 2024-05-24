const {defineConfig} = require('@vue/cli-service')
const webpack = require("webpack")
module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        // 限制打包到一个文件
        // config.optimization.delete('splitChunks');
        config
            .plugin('limitSplitChunks')
            .use(webpack.optimize.LimitChunkCountPlugin, [{maxChunks: 1}]);
    }
})
