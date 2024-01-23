import LsRequest from "./request"
import {BASE_URL, TIME_OUT} from "@/config";

const lsRequest:LsRequest = new LsRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    // 当前实例的全局请求拦截器
    interceptors: {
        requestSuccessFn(config: any) {
            // config.headers.Authorization = `Bearer` + token
            return config
        },
        responseSuccessFn(res:any) {
            return res.data
        }
    }
})

export default lsRequest

