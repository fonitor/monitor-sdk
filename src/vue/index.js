import { handleVueError } from './help'

/**
 * vue 错误监听
 */
export const MitoVue = {
    /**
     * @param {*} Vue 
     */
    install(Vue) {
        if (!Vue || !Vue.config) return
        let that = this
        // vue 提供 warnHandler errorHandler报错信息
        Vue.config.errorHandle = function (err, vm, info) {
            handleVueError.apply(null, [that, err, vm, info, Vue])
        }
    }
}
