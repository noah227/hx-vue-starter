import {defineStore} from "pinia";
import {ref} from "vue";


type TConfiguration = {
    colorScheme: string
}

export type TEnvInfo = {
    // 运行时的html根路径，路径中包含正斜杠，结尾不包含斜杠
    htmlRoot: string
    configuration: TConfiguration
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
        }
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
     * 处理运行时的资源文件地址
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
