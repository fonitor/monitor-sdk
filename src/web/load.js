
import { replaceNetwork, replaceError } from './replace'



/**
 * 针对web 载入
 * @param {*} webMonitor 
 */
export function setupReplace(webMonitor) {
    // 处理http
    replaceNetwork(webMonitor)
    // js 错误
    replaceError(webMonitor)
}