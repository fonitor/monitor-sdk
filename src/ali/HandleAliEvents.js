import { getPage } from './util'


const HandleAliAppEvents = {
    onError(e) {
        try {
            if (!this.aliMonitor) return
            let vm = this.aliMonitor
            let data = {
                simpleUrl: getPage(),
                errorMessage: String(e)
            }
            vm.logSave('js_error', data)
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
            vm.logSave('page_pv', data)
            vm.referrerPage = toUrl
        } catch (e) {

        }
    }
}

export { HandleAliAppEvents, HandleAliPageEvents }