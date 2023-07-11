<template>
    <div class="home">
        <button @click="fetchContent">通信：点击获取选择的内容</button>
        <button @click="displayErrorMessage">通信：在窗体上显示错误信息</button>
        <router-link to="/about">路由跳转：点我跳转到about</router-link>
    </div>
</template>

<script lang="ts" setup>
import {getHBuilderX} from "@/hx/index"
import {onMounted, nextTick} from "vue";

/** HBuilderX **/
const initMessage = () => {
    // 事件处理
    getHBuilderX().onDidReceiveMessage((msg: any) => {
        // 这里接收的是dialog创建配置的button被触发的事件
        if (msg.type == 'DialogButtonEvent') {
            let button = msg.button
            if (button == '关闭') {
                getHBuilderX().postMessage({
                    command: "close"
                })
            }
        } else {
            switch (msg.command) {
                case "resFetchContent":
                    alert(msg.data)
                    break
            }
        }
    })
}

const fetchContent = () => {
    getHBuilderX().postMessage({
        command: "fetchContent"
    })
}

const displayErrorMessage = () => {
    getHBuilderX().postMessage({
        command: "displayError",
        data: "随机信息：" + Math.random().toString(32).slice(2).toUpperCase(),
        timeout: 3000
    })
}

onMounted(() => {
    // registerDocumentKeyEvents()
    nextTick(() => {
        window.addEventListener('hbuilderxReady', () => {
            initMessage()
            fetchContent()
        })
    })
})
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    background: linear-gradient(45deg, pink, #0000), linear-gradient(165deg, aqua, #0000), linear-gradient(285deg, pink, #0000);
    display: flex;
    flex-direction: column;

    > * {
        width: fit-content;
        margin-bottom: 12px;
    }
}
</style>
