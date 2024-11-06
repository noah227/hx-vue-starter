const hx = require("hbuilderx")
const Html = require('./html.js')
const utils = require("./utils.js")
const {processMessage} = require("./main.message.js")
const changeCase = require("change-case-commonjs")

const _showView = () => {
    /**
     * @see [createwebviewdialog](https://hx.dcloud.net.cn/ExtensionDocs/Api/windows/createWebViewDialog)
     */
    let dialog = hx.window.createWebViewDialog({
        modal: true,
        title: "Hello",
        description: "这是一个使用vue在HBuilderX插件中构建可视化界面的示例",
        dialogButtons: ["关闭"],
        // 有关尺寸的说明，见README中 关于dialog尺寸与webview尺寸 的相关介绍
        size: {
            width: 720,
            height: 520
        }
    }, {
        enableScripts: true
    })

    const webview = dialog.webView
    // 加载html内容
    webview.html = Html()

    let displayErrorTid = 0
    // 注册事件，用于通信
    webview.onDidReceiveMessage((msg) => {
        let action = msg.command
        let data = msg.data
        try {
            // 自定义处理
            switch (action) {
                // 关闭对话框
                case "close":
                    dialog.close()
                    break
                case "displayError":
                    dialog.displayError(data)
                    // 官方dialog.displayError未提供timeout参数，所以这里进行了手动消除
                    displayErrorTid && clearTimeout(displayErrorTid)
                    displayErrorTid = setTimeout(() => {
                        dialog.displayError("")
                    }, data.timeout || 3000)
                    break
                // 通用通信处理
                default:
                    processMessage(msg).then(data => {
                        webview.postMessage({
                            command: "res" + changeCase.pascalCase(msg.command),
                            data
                        })
                    }).catch(e => {
                        console.error(`[processMessage error] `, e)
                    })
                    break
            }
        } catch (e) {
            console.error(`switch处理中捕获到未经处理的错误：${e?.message || e?.toString()}`)
        }
    })

    /* 监听IDE配置变动，同步更新配置信息 */
    hx.workspace.onDidChangeConfiguration(e => {
        webview.postMessage({
            command: "resUpdateConfiguration",
            data: utils.getConfiguration()
        })
    })

    // 显示对话框，返回显示成功或者失败的信息，主要包含内置浏览器相关状态。
    dialog.show().then((data) => {
        // 这里不要直接调用webview.postMessage，发不过去的
    })

    // 关闭事件
    dialog.onDialogClosed(disposable => {
        hx.window.setStatusBarMessage(`webview dialog窗口已关闭 | ${Date.now()}`, 3000)
    })
}

module.exports = {
    /**
     * @param {Object} context 不同地方触发有着不同的数据
     */
    showView(context) {
        try {
            _showView()
        } catch (e) {
            console.error(e)
        }
    }
}
