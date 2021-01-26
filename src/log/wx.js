import { initMixin } from './init'

let wxMonitor = {}

wxMonitor.init = function(options) {
    this._init(options)
}

initMixin(wxMonitor)


export default wxMonitor