import { getPage } from './util'


const HandleWxAppEvents = {
    onError(e) {
        if (!this.wxMonitor) return
        let vm = this.wxMonitor
        let data = {
            simpleUrl: getPage(),
            errorMessage: String(e)
        }
        vm.logSave('js_error', data)
    }
}

const HandleWxPageEvents = {
    onLoad() {
        let vm = this.wxMonitor,
            toUrl = getPage()
        let data = {
            simpleUrl: toUrl,
            referrer: vm.referrerPage || "",
        }
        vm.logSave('page_pv', data)
        vm.referrerPage = toUrl
    }
}

export { HandleWxAppEvents, HandleWxPageEvents }