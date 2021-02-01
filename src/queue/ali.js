import Base from './base'

/**
 * 适用于微信消息队列
 */
export default class aliQueue extends Base {
    /**
     * 单例
     * @param {*} baseUrl
     * @return {?}
     */
    static getInstance(baseUrl) {
        if (!aliQueue.instance) {
            aliQueue.instance = new aliQueue(baseUrl)
        }
        return aliQueue.instance
    }

    /**
     * 并发数减一
     * @return {?}
     */
    reduceSynNumFun() {
        aliQueue.instance.synNum--
        return this
    }

    _fetch(data = {}) {
        return new Promise(resolve => {
            my.request({
                url: `${this.baseUrl}${this.api}`,
                data: data,
                method: 'POST',
                dataType: 'json',
                fail: (res) => {},
                complete: (res) => {
                    resolve()
                }
            })
        })
    }
}