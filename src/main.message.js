const hx = require("hbuilderx")
const path = require("path")
const utils = require("./utils.js")

/**
 * 通用通信对象
 * @typedef {{command: string, data: any}} TMessage
 */

/**
 * 消息处理函数
 * @type {{[index: string]: Promise<any>}}
 */
const messageHandlers = {
    /**
     * 初始化runtime运行环境信息
     * @param {TMessage} msg
     */
    initEnvInfo(msg) {
        return new Promise((resolve, reject) => {
            resolve({
                htmlRoot: path.resolve(__dirname, "html").replaceAll(/\\/g, "/"),
                configuration: utils.getConfiguration()
            })
        })
    },
    /**
     * 获取激活文档内容
     * @param {TMessage} msg
     */
    fetchContent(msg) {
        return new Promise((resolve, reject) => {
            hx.window.getActiveTextEditor().then(editor => {
                const text = editor.document.getText(editor.selection)
                resolve(text || "什么都没有选择")
            }).catch(reject)
        })
    },
    /**
     * 同步保存配置
     * @param {TMessage} msg
     */
    syncConfig({data}){
        return new Promise((resolve, reject) => {
            utils.updateConfiguration(data)
            resolve("配置已保存")
        })
    }
}

module.exports = {
    /**
     * 需要和vue页面通信的才写在这里处理，
     * 像是只有单纯的dialog操作且不需要回复通信的，不需要写在这里
     * @param {TMessage} msg
     */
    processMessage(msg) {
        return new Promise((resolve, reject) => {
            const handler = messageHandlers[msg.command]
            if (handler) {
                handler(msg).then(resolve).catch(reject)
            } else {
                reject(new Error(`未找到与 ${msg.command} 相关的处理函数！`))
            }
        })
    }
}