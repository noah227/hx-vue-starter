# hx-vue-starter

一个使用vue的HBuilderX插件基础示例

## 适用场景

构建可视化界面，比如 `hx.window.createWebView` 、`hx.window.createWebViewDialog` 。

框架式编写，开发更高效！维护更方便！

## 使用&开发

本项目目前没有构建cli，直接fork或者clone，然后使用自己的remote进行开发就可以了~

## 发行

* 插件最终发行到 [HBuilderX插件市场](https://ext.dcloud.net.cn/?cat1=1&type=HotList#) 时需要打包成压缩包，本项目预置使用了 [cozip](https://www.npmjs.com/package/cozip) 进行了一个简要的打包。
* 如果有在runtime必须的node_modules依赖，在`./hx-pack.js`里相关位置进行添加，或者选用其他打包方案

## 注意事项

* 命令（ `contributes.commands` ）的注册要避免冲突，如本例中的 `hx-vue-starter.showView` 在实际使用时要改为独特的、不易冲突的命名

## 其他

### 关于教程

* 官方有教程
    * [粗略示例与开发指南](https://hx.dcloud.net.cn/ExtensionTutorial/README)
    * [较为详细的api部分](https://hx.dcloud.net.cn/ExtensionDocs/Api/README)
* 当然，教程中有些还是不够详细，官方另外有示例项目，见 [hbuilderx-extension-samples](https://github.com/dcloudio/hbuilderx-extension-samples)

关于Vue编写部分的注意事项，详见

### 关于主题适配

`hx.window.createWebViewDialog` 创建的窗体没法定义背景颜色，所以即使web做了主题适配，dialog整体背景层还是白色的。即，做主题适配暂无意义

### 关于dialog尺寸与webview尺寸

* 左右边距40px
* 上边距99px
* 下边距73px
* 上下边距跟dialog是否设置了description、是否展示message没有关系
* `hx.window.createWebViewDialog` 的size就是dialog的整体size

### 关于配置的获取与保存

* 配置项并不一定要直接写在package.json的contributes.configuration里，就目前而言，写不写，代码内关于config的get和update接口都是有效的
* 区别就在于，写在package.json里面的，用户可以在设置界面看到并进行配置