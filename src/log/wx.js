
import BaseMonitor from './base'
import wxQueue from '../queue/wx'
const queue = null

export default class wxMonitor extends BaseMonitor {
    

    initQueue() {
        // 消息队列初始化
        queue = new wxQueue(this._conf.baseUrl)
    }
}
