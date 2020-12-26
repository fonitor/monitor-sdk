
/**
 * 消息队列 Base
 */
export default class Base {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.requestQueue = [] // 队列
        this.requestTimmer = undefined
        this.synRequestNum = 4
        this.synNum = 0
        this.retryNum = 1 // 重试上报机制
    }

    /**
     * 同步队列 （传入对象必须要有logType，logError）
     * @param {*} log 队列日志
     */
    pushToQueue(log) {
        {
            // 简单先同步放入数组中
            this.requestQueue.push(log)
            return this.onReady(() => {
                this.requestTimmer = this.delay(() => {
                    this.clear()
                }, this.requestQueue[0] && (!!this.requestQueue[0].logError && this.requestQueue[0].logError > 0) ? 3e3 : -1)
            })
        }
    }

    /**
     * 宏任务（检测是否有唯一对应值）
     * @param {*} fun
     */
    onReady(fun) {
        if (typeof fun != 'function') {
            return
        }
        // 检测是否有 openId 如果没有则延迟上报
        if (fun) {
            fun()
        }
    }

    /**
     * 执行队列
     * @param {*} fun
     * @param {*} e
     */
    delay(fun, e) {
        if (!fun && typeof fun != 'function') return null
        return e === -1 ? (fun(), null) : setTimeout(fun, e || 0)
    }

    /**
     * 并发限制
     * @return {?}
     */
    clear() {
        var e
        if (this.synNum > this.synRequestNum) {
            return clearTimeout(this.requestTimmer), this.requestTimmer = setTimeout(() => {
                this.clear()
            }, 50)
        }
        for (clearTimeout(this.requestTimmer), this.requestTimmer = null; this.synNum < this.synRequestNum && (e = this.requestQueue.pop()); this.synNum++) {
            this.handleLog(e)
        }
        // 执行完如果还有数据则继续执行（放到宏任务）
        !!this.requestQueue.length && (this.requestTimmer = setTimeout(() => {
            this.clear()
        }, 50))

    }

    /**
     * 清空队列
     * @return {?}
     */
    clearAll() {
        this.requestQueue = []
        this.requestTimmer = null
        this.synNum = 0
    }

    /**
     * 并发数减一
     * @return {?}
     */
    reduceSynNumFun() {
        Queue.instance.synNum--
        return this
    }

    /**
     * 上报
     * @param {*} e logType判断上传接口是哪种类型 pv：上报pv 逻辑 mv：上报mv逻辑 logError：0 代码重新上报次数0次，用int后续方便扩展
     */
    handleLog(e) {
        // 深拷贝避免影响其他数据
        let log = JSON.parse(JSON.stringify(e))
        try {
            let param = {
                viewData: log
            }
            this._fetch(param).then(_ => {
                this.reduceSynNumFun()
            })
        } catch (err) {
            this.reduceSynNumFun()
        }
    }

    

}