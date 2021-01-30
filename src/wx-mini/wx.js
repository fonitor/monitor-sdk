import { initMixin } from './wxInit'
import { initBaseOptions } from '../conmmon/initBaseOptions'
import { initSaveLog } from '../conmmon/initLog'

let wxMonitor = {}

wxMonitor.init = function(options) {
    this._init(options)
}

initMixin(wxMonitor)
initBaseOptions(wxMonitor)
initSaveLog(wxMonitor)


export default wxMonitor