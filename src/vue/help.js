import * as webConfig from '../config/web'
import { getLocationHref } from '../web/util'

/**
 * vue 报错
 * @param {*} monitor 
 * @param {*} err 
 * @param {*} vm 
 * @param {*} info 
 * @param {*} Vue 
 */
export function handleVueError(monitor, err, vm, info,  Vue) {
    const version = Vue?.version
    let data = {
        type: webConfig.VUE_ERROR,
        message: `${err.message}(${info})`,
        level,
        url: getLocationHref(),
        name: err.name,
        stack: err.stack || [],
      }
}