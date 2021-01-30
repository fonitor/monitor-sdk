
export function initSaveLog(monitor) {
    /**
     * 设置用户唯一标识
     * @param {*} userId 
     */
    monitor.setUserId = function (userId) {
        this.userId = userId
    }
}