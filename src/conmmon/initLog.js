import util from '../util/index'
import * as config from '../config/index'


export function initSaveLog(monitor) {
    /**
     * 上传日志
     * @param {*} type 
     * @param {*} data 
     */
    monitor.logSave = function (type, data) {
        let useData,
            logData = JSON.parse(JSON.stringify(data)),
            vm = this
        if (!vm.baseOptions) {
            vm.optionsInit(vm.$options)
            setTimeout(() => {
                this.logSave(type, data)
            }, 500)
            return
        }
        switch (type) {
            case config.PAGE:
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            case config.JS_ERROR:
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            case config.HTTP_LOG:
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            case config.RESOURCE_LOAD:
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            default:

        }
    }
}