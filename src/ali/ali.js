import { initMixin } from './aliInit'
import { initBaseOptions } from '../conmmon/initBaseOptions'
import { initSaveLog } from '../conmmon/initLog'
import { initFun } from '../conmmon/initFun'

let aliMonitor = {}

aliMonitor.init = function(options) {
    this._init(options)
}

initMixin(aliMonitor)
initBaseOptions(aliMonitor)
initSaveLog(aliMonitor)
initFun(aliMonitor)


export default aliMonitor