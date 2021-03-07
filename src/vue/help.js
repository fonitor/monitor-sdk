import * as webConfig from '../config/web'
import { getLocationHref } from '../web/util'
import { variableTypeDetection, getBigVersion } from '../util/help'

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
      if (variableTypeDetection.isString(version)) {
        console.log('getBigVersion', getBigVersion(version))
        switch (getBigVersion(version)) {
          case 2:
            data = { ...data, ...vue2VmHandler(vm) }
            break
          case 3:
            data = { ...data, ...vue3VmHandler(vm) }
            break
          default:
            return
            break
        }
      }
      
}

/**
 * vue 2
 * @param {*} vm 
 */
export function vue2VmHandler(vm) {

}

/**
 * vue3
 * @param {*} vm 
 */
export function vue3VmHandler(vm) {

}