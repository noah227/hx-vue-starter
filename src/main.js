const hx = require("hbuilderx")
const Html = require('./html.js')
const path = require("path")

const showView = () => {
	/**
	 * @see [createwebviewdialog](https://hx.dcloud.net.cn/ExtensionDocs/Api/windows/createWebViewDialog)
	 */
	let dialog = hx.window.createWebViewDialog({
		modal: true,
		title: "Hello",
		description: "这是一个使用vue在HBuilderX插件中构建可视化界面的实例",
		dialogButtons: ["关闭"],
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

	// 注册事件，用于通信
	webview.onDidReceiveMessage((msg) => {
		let action = msg.command
		let data = msg.data
		// 自定义处理
		switch (action) {
			// 关闭对话框
			case "close":
				dialog.close()
				break
            case "initEnvInfo":
            	webview.postMessage({
            		command: "resInitEnvInfo",
            		data: {
            	        htmlRoot: path.resolve(__dirname, "html").replaceAll(/\\/g, "/")
            	    }
            	})
            	break
			case "fetchContent":
				hx.window.getActiveTextEditor().then(editor => {
					const text = editor.document.getText(editor.selection)
					webview.postMessage({
						command: "resFetchContent",
						data: text || "什么都没有选择"
					})
				})
				break
			case "displayError":
				dialog.displayError(data)
				// 官方dialog.displayError未提供timeout参数，所以这里进行了手动消除
				setTimeout(() => {
					dialog.displayError("")
				}, data.timeout || 3000)
				break
			default:
				break
		}
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
	showView
}
