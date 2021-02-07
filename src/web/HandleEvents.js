import { HTTP_CODE } from '../conmmon/constant'


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
        console.log('接收到错误')
        console.log(errorEvent)
        const target = errorEvent.target
        console.log(target)
    }
}

export { HandleEvents }