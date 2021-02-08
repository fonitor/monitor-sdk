import { HTTP_CODE } from '../conmmon/constant'
import { isError } from '../util/help'


const HandleEvents = {
    /**
     * 处理xhr、fetch回调
     * @param {*} data 
     * @param {*} type 
     */
    handleHttp(data, type) {

    },

    /**
     * js 错误
     * @param {*} errorEvent 
     */
    handleError(errorEvent) {
        const target = errorEvent.target
        console.log(errorEvent)
        // 资源错误
        if (!!target.localName) {
            return
        }
        // code error
        const { message, filename, lineno, colno, error } = errorEvent
        let result
        if (error && isError(error)) {
            // result = extractErrorStack(error)
        }
    }
}

export { HandleEvents }