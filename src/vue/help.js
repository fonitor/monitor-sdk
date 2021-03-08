import * as webConfig from '../config/web'
import * as commonConfig from '../config/index'
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
export function handleVueError(monitor, err, vm, info, Vue) {
  const version = Vue?.version
  let errorMessage = {
    type: webConfig.VUE_ERROR,
    message: `${err.message}(${info})`,
    name: err.name,
    stack: err.stack || [],
  }
  if (variableTypeDetection.isString(version)) {
    console.log('getBigVersion', getBigVersion(version))
    switch (getBigVersion(version)) {
      case 2:
        data = { ...errorMessage, ...vue2VmHandler(vm) }
        break
      case 3:
        data = { ...errorMessage, ...vue3VmHandler(vm) }
        break
      default:
        return
        break
    }
  }
  let param = {
    simpleUrl: getLocationHref(),
    errorMessage: String(errorMessage)
  }
  if (!monitor) return
  monitor.logSave(commonConfig.JS_ERROR, param)
}

/**
 * vue 2
 * @param {*} vm 
 */
export function vue2VmHandler(vm) {
  let componentName = ''
  if (vm.$root === vm) {
    componentName = 'root'
  } else {
    const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
    componentName =
      (name ? 'component <' + name + '>' : 'anonymous component') +
      (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
  }
  return {
    componentName,
    propsData: vm.$options && vm.$options.propsData
  }
}

/**
 * vue3
 * @param {*} vm 
 */
export function vue3VmHandler(vm) {
  let componentName = ''
  if (vm.$root === vm) {
    componentName = 'root'
  } else {
    console.log(vm.$options)
    const name = vm.$options && vm.$options.name
    componentName = name ? 'component <' + name + '>' : 'anonymous component'
  }
  return {
    componentName,
    propsData: vm.$props
  }
}