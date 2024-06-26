import {defineStore} from "pinia";
import {ref} from "vue";


// 对应HBuilderX的hx.workspace.getConfiguration get获取的数据
type TConfiguration = {
    colorScheme: string
}

export type TEnvInfo = {
    // 运行时的html根路径，路径中包含正斜杠，结尾不包含斜杠；主要是用来处理静态资源的
    htmlRoot: string
    configuration: TConfiguration
    hxReady: boolean
}

/**
 * env，主要用于网页页面与hbx插件的一个环境协同
 * 如静态资源加载的路径处理等
 */
export const useEnv = defineStore("pinia", () => {
    const envInfo = ref<TEnvInfo>({
        htmlRoot: "",
        configuration: {
            colorScheme: ""
        },
        hxReady: false
    })
    /**
     * 同步更新整体的hbx若干信息
     */
    const updateEnvInfo = (info?: Partial<TEnvInfo>) => {
        envInfo.value = {...envInfo.value, ...info}
    }
    /**
     * 同步更新hbx配置信息（部分）
     */
    const updateConfiguration = (config?: TConfiguration) => {
        envInfo.value.configuration = {...envInfo.value.configuration, ...config}
    }
    /**
     *
     * 处理运行时的资源文件地址
     *
     * 如果处理了publicPath（__webpack_public_path__），那这个就是不需要的了
     * @param path 相对路径
     */
    const renderPath = (path: string) => {
        return [envInfo.value.htmlRoot, path].join("/")
    }
    return {
        envInfo, updateEnvInfo, renderPath,
        updateConfiguration
    }
})
