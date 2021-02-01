import { initMixin } from './aliInit'
import { initBaseOptions } from '../conmmon/initBaseOptions'
import { initSaveLog } from '../conmmon/initLog'

let alMonitor = {}

alMonitor.init = function(options) {
    this._init(options)
}

initMixin(alMonitor)
initBaseOptions(alMonitor)
initSaveLog(alMonitor)


export default alMonitor