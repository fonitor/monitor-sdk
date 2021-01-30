import util from '../util/index'


const HandleWxAppEvents = {
    onError(e) {
        if (!this.wxMonitor) return
        let vm = this.wxMonitor
        let data = {
            simpleUrl: util.getPage(),
            errorMessage: String(e)
        }
        vm.logSave('js_error', data)
    }
}

const HandleWxPageEvent = {
    onLoad() {
        
    }
}

export { HandleWxAppEvents, HandleWxPageEvent }