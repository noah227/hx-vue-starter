const hx = require("hbuilderx")
const path = require("path")

const _configSets = [
    ["colorScheme", "editor.colorScheme"]
]
module.exports = {
    /**
     * @param {[k: string, gk: string][]} configSets
     * @see https://hx.dcloud.net.cn/ExtensionDocs/Api/workspace/getConfiguration?id=get
     */
    getConfiguration(configSets = []) {
        const config = hx.workspace.getConfiguration()
        const _ = {}
        ![..._configSets, ...configSets].forEach(([k, gk]) => {
            _[k] = config.get(gk)
        })
        return _
    },
    /**
     * 更新配置
     *
     * 更多关于配置获取与保存的注意事项，见README中有关的说明
     *
     * @see https://hx.dcloud.net.cn/ExtensionDocs/Api/workspace/getConfiguration?id=update
     * @param {Object} obj
     * @param {string} section !!这里默认使用了插件的id为主key，如有需要请自行更改
     */
    updateConfiguration(obj = {}, section) {
        section = section || require(path.resolve(__dirname, "../package.json")).id
        const config = hx.workspace.getConfiguration(section)
        Object.entries(obj).forEach(([k, v]) => {
            config.update(k, v)
        })
    }
}
