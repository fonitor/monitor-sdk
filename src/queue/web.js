import Base from './base'

/**
 * 适用于web消息队列
 */
export default class webQueue extends Base {
    /**
     * 单例
     * @param {*} baseUrl
     * @return {?}
     */
    static getInstance(baseUrl) {
        if (!webQueue.instance) {
            webQueue.instance = new webQueue(baseUrl)
        }
        return webQueue.instance
    }

    /**
     * 并发数减一
     * @return {?}
     */
    reduceSynNumFun() {
        webQueue.instance.synNum--
        return this
    }

    _fetch(data = {}) {
        return new Promise(resolve => {
            
            try {
                const xhr = new XMLHttpRequest()
                function state_Change() {
                    /**
                     * 0    Uninitialized  初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
                     * 1    Open           open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
                     * 2    Sent           Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
                     * 3    Receiving      所有响应头部都已经接收到。响应体开始接收但未完成。
                     * 4    Loaded         HTTP 响应已经完全接收。
                     */
                    if (xhr.readyState === 4) {
                        resolve()
                    }
                }
                xhr.open('POST', `${this.baseUrl}${this.api}`)
                xhr.onreadystatechange = state_Change;
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                xhr.withCredentials = true
                xhr.send(JSON.stringify(data))
            } catch (e) {
                resolve()
            }
        })
    }
}