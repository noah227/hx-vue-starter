const hx = require("hbuilderx")

const configSets = [
    ["colorScheme", "editor.colorScheme"]
]
module.exports = {
    getConfiguration() {
        const config = hx.workspace.getConfiguration()
        const _ = {}
        configSets.forEach(([k, gk]) => {
            _[k] = config.get(gk)
        })
        return _
    }
}