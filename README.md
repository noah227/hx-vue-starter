# hx-vue-starter

一个使用vue的HBuilderX插件基础示例

## 使用场景

构建可视化界面，比如`hx.window.createWebViewDialog`。框架式编写，开发更高效！维护更方便！

## 使用&开发

本项目目前没有构建cli，直接fork或者clone，然后使用自己的remote进行开发就可以了~

## 发行

插件最终发行到 [HBuilderX插件市场](https://ext.dcloud.net.cn/?cat1=1&type=HotList#) 时需要打包成压缩包，本项目预置使用了 [cozip]() 进行了一个简要的打包。
如果有在runtime必须的node_modules依赖，在`./hx-pack.js`里相关位置进行添加，或者选用其他打包方案

## 其他

关于Vue编写部分的注意事项，详见
