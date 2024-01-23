import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

enum TypeOption {
    INFO = "info",
    WARNING = "warning",
    SUCCESS ="success"
}
class Msg {
    show(_msg:string,type:TypeOption,callback?:()=>void) {
        if (!_msg) {
            return;
        }
        ElMessage({
            message:_msg,
            type:type,
            duration:3000,
            onClose:callback
        })
    }

    info(msg:string,callback?:()=>void) {
        this.show(msg,TypeOption.INFO,callback)
    }
    success(msg:string,callback?:()=>void) {
        this.show(msg,TypeOption.SUCCESS,callback)
    }
    warning(msg:string,callback?:()=>void) {
        this.show(msg,TypeOption.WARNING,callback)
    }
}

export default new Msg()