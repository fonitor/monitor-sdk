import { replaceApp, replaceNetwork } from './replace'

/**
 * 初始化
 * @param {*} wxMonitor 
 */
export function setupReplace(wxMonitor) {
    replaceApp(wxMonitor)
    replaceNetwork(wxMonitor)
}