import { replaceApp, replaceNetwork, replacePage } from './replace'

/**
 * 初始化
 * @param {*} wxMonitor 
 */
export function setupReplace(wxMonitor) {
    replacePage(wxMonitor)
    replaceApp(wxMonitor)
    replaceNetwork(wxMonitor)
}