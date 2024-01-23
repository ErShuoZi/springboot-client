import lsRequest from "@/util";

function SaveFurnRequest(data:any):any {
    return lsRequest.post({
        url:"/save",
        data,
        interceptors: {
            requestSuccessFn(config: any) {
                // config.headers.Authorization = `Bearer` + token
                return config
            },
            // responseFailFn(err:any) {
            //     return err
            // }
        }
    })
}

function LoadFurnListRequest(data:any):any {
    return lsRequest.post({
        url:"/list",
        data
    })
}
function updateFurnListRequest(data:any):any {
    return lsRequest.put({
        url:"/update",
        data
    })
}

function searchByIdFurnListRequest(data:any):any {
    return lsRequest.post({
        url:"/findById",
        data
    })
}

function deleteById(params:any):any {
    return lsRequest.delete({
        url:`/deleteById/${params}`,
    })
}
function listByPage(params:any):any {
    return lsRequest.post({
        url:`/listFurnsByPage`,
        params:{
            pageNum:params.pageNum.value,
            pageSize:params.pageSize.value
        }
    })
}
export {SaveFurnRequest,LoadFurnListRequest,updateFurnListRequest,searchByIdFurnListRequest,deleteById,listByPage}