import {defineStore} from "pinia";
import {ref} from "vue";


export type TEnvInfo = {
    // 运行时的html根路径，路径中包含正斜杠，结尾不包含斜杠
    htmlRoot: string
}

export const useEnvInfo = defineStore("pinia", () => {
    const envInfo = ref<TEnvInfo>({
        htmlRoot: ""
    })
    const updateEnvInfo = (info?: Partial<TEnvInfo>) => {
        envInfo.value = {...envInfo.value, ...info}
    }
    return {envInfo, updateEnvInfo}
})
