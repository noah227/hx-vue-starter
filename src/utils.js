const hx = require("hbuilderx")

const _configSets = [
    ["colorScheme", "editor.colorScheme"]
]
module.exports = {
    /**
     * @param {[k: string, gk: string][]} configSets
     */
    getConfiguration(configSets=[]) {
        const config = hx.workspace.getConfiguration()
        const _ = {}
        ![..._configSets, ...configSets].forEach(([k, gk]) => {
            _[k] = config.get(gk)
        })
        return _
    }
}
