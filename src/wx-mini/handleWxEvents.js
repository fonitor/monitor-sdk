import { getPage } from './util'
import * as commonConfig from '../config/index'


const HandleWxAppEvents = {
    onError(e) {
        try {
            if (!this.wxMonitor) return
            let vm = this.wxMonitor
            let data = {
                simpleUrl: getPage(),
                errorMessage: String(e)
            }
            vm.logSave(commonConfig.JS_ERROR, data)
        } catch (e) { }
    }
}

const HandleWxPageEvents = {
    onLoad() {
        try {
            if (!this.wxMonitor) return
            let vm = this.wxMonitor,
                toUrl = getPage()
            let data = {
                simpleUrl: toUrl,
                referrer: vm.referrerPage || "",
            }
            vm.logSave(commonConfig.PAGE, data)
            vm.referrerPage = toUrl
        } catch (e) { }
    }
}

export { HandleWxAppEvents, HandleWxPageEvents }