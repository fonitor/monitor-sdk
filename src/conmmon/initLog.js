import util from '../util/index'


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
            vm.optionsInit(vm.options)
            setTimeout(() => {
                this.logSave(type, data)
            }, 500)
            return
        }
        switch (type) {
            case 'page_pv':
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            case 'js_error':
                useData = Object.assign(logData, vm.baseOptions)
                useData.userId = vm.userId || "", // 用户标识
                    useData.uploadType = type
                useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
                vm.queue.pushToQueue(useData)
                break
            case 'http_log':
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