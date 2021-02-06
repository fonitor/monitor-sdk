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
            
        })
    }
}