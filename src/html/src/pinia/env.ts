import {defineStore} from "pinia";
import {ref} from "vue";


export type TEnvInfo = {
    // 运行时的html根路径，路径中包含正斜杠，结尾不包含斜杠
    htmlRoot: string
}

/**
 * env，主要用于网页页面与hbx插件的一个环境协同
 * 如静态资源加载的路径处理等
 */
export const useEnv = defineStore("pinia", () => {
    const envInfo = ref<TEnvInfo>({
        htmlRoot: "",
    })
    const updateEnvInfo = (info?: Partial<TEnvInfo>) => {
        envInfo.value = {...envInfo.value, ...info}
    }
    /**
     * 处理运行时的资源文件地址
     * @param path 相对路径
     */
    const renderPath = (path: string) => {
        return [envInfo.value.htmlRoot, path].join("/")
    }
    return {envInfo, updateEnvInfo, renderPath}
})
