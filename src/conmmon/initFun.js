import { errorBoundaryReport } from '../react/index'


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
}