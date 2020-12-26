import Base from './base'

/**
 * 适用于微信消息队列
 */
export default class wxQueue extends Base {
    _fetch(data = {}) {
        return new Promise(resolve => {
            wx.request({
                url: `${this.baseUrl}`,
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