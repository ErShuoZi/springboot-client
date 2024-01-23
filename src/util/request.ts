import axios from "axios";
import type { AxiosInstance } from "axios"

class LsRequest {
    instance:AxiosInstance;
    constructor(config:any) {
        //每个实例的全局请求拦截器
        this.instance = axios.create(config)
        this.instance.interceptors.request.use(config => {
            return config;
        },error => {
            return error
        })
        //每个实例的全局响应拦截器
        this.instance.interceptors.response.use(response => {
            return response
        },error => {
            return error
        })

        //针对该实例添加的拦截器
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailFn
        )
        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responsetFailFn
        )
    }

    request(config:any) {
        //针对单个请求的拦截器
        if (config.interceptors?.request) {
            config = config.interceptors.requestSuccessFn(config);
        }
       return new Promise((resolve, reject) => {
           return this.instance.request(config).then(res =>{
               if (config.interceptors?.requestSuccessFn) {
                   res = config.interceptors.requestSuccessFn(res)
               }
               resolve(res)
           }).catch(err => {
              if (config.interceptors?.responseFailFn) {
                  err = config.interceptors.responseFailFn(err)
              }
               reject(err)
           })
       })
    }

    get(config:any) {
        return this.request({...config,method:"GET"})
    }


    post(config:any) {
        return this.request({...config,method:"POST"})
    }
    delete(config:any) {
        return this.request({...config,method:"DELETE"})
    }

    put(config:any) {
        return this.request({...config,method:"PUT"})
    }


}

export default LsRequest;

