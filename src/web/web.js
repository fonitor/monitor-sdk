import { initMixin } from './webInit'
import { initBaseOptions } from '../conmmon/initBaseOptions'
import { initSaveLog } from '../conmmon/initLog'
import { initFun } from '../conmmon/initFun'

let webMonitor = {}

webMonitor.init = function(options) {
    this._init(options)
}

initMixin(webMonitor)
initBaseOptions(webMonitor)
initSaveLog(webMonitor)
initFun(webMonitor)


export default webMonitor