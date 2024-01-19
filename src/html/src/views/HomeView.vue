<template>
    <div v-if="env.envInfo.htmlRoot" class="home">
        <button @click="fetchContent">通信：点击获取选择的内容</button>
        <button @click="displayErrorMessage">通信：在窗体上显示错误信息</button>
        <router-link to="/about">路由跳转：点我跳转到about</router-link>
        <img :src="rImg2" style="width: 100px" alt="">
    </div>
</template>

<script lang="ts" setup>
import {getHBuilderX} from "@/hx"
import {computed, nextTick, onMounted} from "vue";
import {useEnv} from "@/pinia/env";

const env = useEnv()
const rImg2 = computed(() => {
    return env.renderPath("public/images/22234.jpg")
})

/** HBuilderX **/
const initMessage = () => {
    // 事件处理
    getHBuilderX().onDidReceiveMessage((msg: any) => {
        console.log("Web页面接收到消息：", msg)
        // 这里接收的是dialog创建配置的button被触发的事件
        if (msg.type == 'DialogButtonEvent') {
            let button = msg.button
            if (button == '关闭') {
                getHBuilderX().postMessage({
                    command: "close"
                })
            }
        }
        // 数据通信
        else {
            switch (msg.command) {
                case "resInitEnvInfo":
                    env.updateEnvInfo(msg.data)
                    break
                case "resUpdateConfiguration":
                    env.updateConfiguration(msg.data)
                    break
                case "resFetchContent":
                    alert(msg.data)
                    break
            }
        }
    })
}

/**
 * 通信：获取envInfo，主要用来解决页面中静态资源的渲染问题
 */
const initEnvInfo = () => {
    getHBuilderX().postMessage({
        command: "initEnvInfo"
    })
}

/**
 * 示例通信：获取编辑器中选择的文本
 */
const fetchContent = () => {
    getHBuilderX().postMessage({
        command: "fetchContent"
    })
}

/**
 * 通信：在窗体上显示错误信息
 */
const displayErrorMessage = () => {
    getHBuilderX().postMessage({
        command: "displayError",
        data: "随机信息：" + Math.random().toString(32).slice(2).toUpperCase(),
        timeout: 3000
    })
}

onMounted(() => {
    nextTick(() => {
        // hbx ready之后进行初始化操作
        window.addEventListener('hbuilderxReady', () => {
            // 初始化通信监听
            initMessage()
            // 如果需要在webview窗口打开时进行数据交换，可以这样做
            setTimeout(() => {
                // 这个时候的window.postMessageToHX是已经初始化完成了的
                initEnvInfo()
            }, 0)
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
