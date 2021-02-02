import { replaceNetwork } from './replace'

/**
 * 初始化
 * @param {*} aliMonitor 
 */
export function setupReplace(aliMonitor) {
    // replacePage(aliMonitor)
    // replaceApp(aliMonitor)
    replaceNetwork(aliMonitor)
}