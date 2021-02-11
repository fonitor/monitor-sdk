import { getPage } from './util'
import * as commonConfig from '../config/index'


const HandleAliAppEvents = {
    onError(e) {
        try {
            if (!this.aliMonitor) return
            let vm = this.aliMonitor
            let data = {
                simpleUrl: getPage(),
                errorMessage: String(e)
            }
            vm.logSave(commonConfig.JS_ERROR, data)
        } catch (e) {
        }
    }
}

const HandleAliPageEvents = {
    onLoad() {
        try {
            if (!this.aliMonitor) return
            let vm = this.aliMonitor,
                toUrl = getPage()
            let data = {
                simpleUrl: toUrl,
                referrer: vm.referrerPage || "",
            }
            vm.logSave(commonConfig.PAGE, data)
            vm.referrerPage = toUrl
        } catch (e) {

        }
    }
}

export { HandleAliAppEvents, HandleAliPageEvents }