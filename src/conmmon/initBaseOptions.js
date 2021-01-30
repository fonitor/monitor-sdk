import * as config from '../config/wx'
import util from '../util/index'

/**
 * 初始化
 * @param {*} wxMonitor 
 * @param {*} type 
 */
export function initBaseOptions(monitor) {
    monitor.optionsInit = function (option, type) {
        let vm = this
        switch (type) {
            case config.WX_TYPE:
                // 初始化上传参数
                wx.getSystemInfo({
                    success: (res) => {
                        vm.baseOptions = {
                            app: option.app || "",
                            type: config.WX_TYPE, // 代表微信小程序
                            projectVersion: option.projectVersion || config.WX_PROJECT_VERSION, // 项目版本号
                            customerKey: util.generateUUID(), // 会话id
                            os: res.system.indexOf('iOS') === -1 ? 'Android' : 'IOS', // 系统信息
                            deviceName: res.model, // 手机型号
                            brand: res.brand, // 手机品牌
                            browserVersion: res.version, // 小程序版本号
                        }
                    }
                });
                break
            default:
                break
        }
    }


}