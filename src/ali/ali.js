import { initMixin } from './aliInit'
import { initBaseOptions } from '../conmmon/initBaseOptions'
import { initSaveLog } from '../conmmon/initLog'

let aliMonitor = {}

aliMonitor.init = function(options) {
    this._init(options)
}

initMixin(aliMonitor)
initBaseOptions(aliMonitor)
initSaveLog(aliMonitor)


export default aliMonitor