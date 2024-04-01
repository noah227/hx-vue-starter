const cozip = require("cozip")

const pack = () => {
    cozip("pack.zip", [
        // [path, isDir, filter?]
        ["./src/html/dist", true],
        ["./src/html.js"],
        ["./src/main.js"],
        ["./src/utils.js"],
        ["./extension.js"],
        ["./package.json"],
        ["./node_modules/hx-vue-dist-loader", true],
    ])
}

pack()
