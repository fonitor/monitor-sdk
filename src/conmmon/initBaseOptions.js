import { WX_TYPE, WX_PROJECT_VERSION } from '../config/wx'
import { ALI_TYPE, ALI_PROJECT_VERSION } from '../config/ali'
import util from '../util/index'

/**
 * 初始化
 * @param {*} wxMonitor 
 * @param {*} type 
 */
export function initBaseOptions(monitor) {
    monitor.optionsInit = function (option) {
        let vm = this
        let type = vm.SOURCE_TYPE
        switch (type) {
            case WX_TYPE:
                // 初始化上传参数
                wx.getSystemInfo({
                    success: (res) => {
                        vm.baseOptions = {
                            app: option.app || "",
                            type: WX_TYPE, // 代表微信小程序
                            projectVersion: option.projectVersion || WX_PROJECT_VERSION, // 项目版本号
                            customerKey: util.generateUUID(), // 会话id
                            os: res.system.indexOf('iOS') === -1 ? 'Android' : 'IOS', // 系统信息
                            deviceName: res.model, // 手机型号
                            brand: res.brand, // 手机品牌
                            browserVersion: res.version, // 小程序版本号
                        }
                    }
                });
                break
            case ALI_TYPE:
                // 初始化上传参数
                my.getSystemInfo({
                    success: (res) => {
                        vm.baseOptions = {
                            app: option.app || "",
                            type: ALI_TYPE, // 代表微信小程序
                            projectVersion: option.projectVersion || ALI_PROJECT_VERSION, // 项目版本号
                            customerKey: util.generateUUID(), // 会话id
                            os: res.platform === 'iOS' ? 'IOS' : 'Android', // 系统信息
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