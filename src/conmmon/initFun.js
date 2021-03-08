import { errorBoundaryReport } from '../react/index'
import { MitoVue } from '../vue/index'
import { log } from './initLog'


export function initFun(monitor) {
    /**
     * 设置用户唯一标识
     * @param {*} userId 
     */
    monitor.setUserId = function (userId) {
        this.userId = userId
    }

    /**
     * react 错误上报
     */
    monitor.errorBoundaryReport = errorBoundaryReport

    /**
     * vue 错误
     */
    monitor.MitoVue = MitoVue

    /**
     * 自定义上传log
     */
    monitor.log = log
}