
import BaseMonitor from './base'
import wxQueue from '../queue/wx'

export default class wxMonitor extends BaseMonitor {

    constructor() {
        super()
    }

    /**
     * 单例
     * @return {?}
     */
    static getInstance() {
        if (!wxMonitor.instance) {
            wxMonitor.instance = new wxMonitor()
            wxMonitor.queue = null
        }
        return wxMonitor.instance
    }

    /**
     * wx 消息队列重写方法
     */
    initQueue() {
        try {
            // 消息队列初始化
            wxMonitor.queue = wxQueue.getInstance(this._conf.baseUrl)
        } catch (err) {
            util.warn("[cloudMonitor] queue init:error", t)
        }
    }

    /**
     * 微信代理方法
     */
    addHook() {
        let config = this._conf
        if (config && config.autoReportPage) {
            if (typeof wx.navigateTo == 'function') {
                console.log('测试')
            }
        }

    }


}
