
import { replaceNetwork } from './replace'



/**
 * 针对web 载入
 * @param {*} webMonitor 
 */
export function setupReplace(webMonitor) {
    // 处理http
    replaceNetwork(webMonitor)
}