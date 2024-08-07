<template>
    <div v-if="readyToRender && env.envInfo.htmlRoot" class="home">
        <button @click="fetchContent">通信：点击获取选择的内容</button>
        <button @click="displayErrorMessage">通信：在窗体上显示错误信息</button>
        <router-link to="/about">路由跳转：点我跳转到about</router-link>
        <img :src="rImg2" style="width: 100px" alt="">
        <input type="text" style="width: 100%" placeholder="dialog的webview似乎不能自动获取焦点, 所以这里设置autofocus和手动focus都没用"/>
    </div>
</template>

<script lang="ts" setup>
import {getHBuilderX} from "@/hx"
import {computed, nextTick, onMounted, ref} from "vue";
import {useEnv} from "@/pinia/env";

const env = useEnv()
const rImg2 = computed(() => {
    return env.renderPath("public/images/22234.jpg")
    // 如果设置了__webpack_public_path__，可以这么写
    // return require("/public/images/22234.jpg")
})

// 没什么特殊需要的话，这玩意儿也可以默认为true
const readyToRender = ref(false)

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
                    // __webpack_public_path__ = `${env.envInfo.htmlRoot}/dist/`
                    readyToRender.value = true
                    break
                case "resUpdateConfiguration":
                    env.updateConfiguration(msg.data)
                    break
                case "resFetchContent":
                    alert(msg.data)
                    break
                case "resSyncConfig":
                    // 如有需要，在这里处理配置同步的回调通信
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

const syncTid = ref(0)
/**
 * 同步配置，运行时有什么需要同步保存到插件配置的，都可以从这里进行
 */
const syncConfig = (data: { [index: string]: any }) => {
    syncTid.value && clearTimeout(syncTid.value)
    syncTid.value = setTimeout(() => {
        getHBuilderX().postMessage({
            command: "syncConfig",
            data
        })
    }, 200) as any
}

onMounted(() => {
    // 这个判定很重要，在readyToRender默认设为false的话，必须处理
    if (env.envInfo.hxReady) return (readyToRender.value = true)
    nextTick(() => {
        // hbx ready之后进行初始化操作
        window.addEventListener('hbuilderxReady', () => {
            env.updateEnvInfo({hxReady: true})
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
@import "./Home.scss";
</style>
