import { initMixin } from './wxInit'

let wxMonitor = {}

wxMonitor.init = function(options) {
    this._init(options)
}

initMixin(wxMonitor)


export default wxMonitor