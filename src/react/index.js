import { isError } from '../util/help'
import { extractErrorStack, getLocationHref } from '../web/util'
import * as webConfig from '../config/web'
import * as commonConfig from '../config/index'

/**
 * 监听react 错误
 * @param {*} ex 
 */
export function errorBoundaryReport(ex) {
    if (!isError(ex)) {
        console.warn('传入的react error不是一个object Error')
        return
    }
    const result = extractErrorStack(ex)
    result.type = webConfig.REACT_ERROR
    let data = {
        simpleUrl: getLocationHref(),
        errorMessage: String(JSON.stringify(result))
    }
    vm.logSave(commonConfig.HTTP_LOG, data)
}
