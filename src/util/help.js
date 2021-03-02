
/**
 * 重写对象上面的某个属性
 * @param {*} source 需要被重写的对象
 * @param {*} name 需要被重写对象的key
 * @param {*} replacement 以原有的函数作为参数，执行并重写原有函数
 * @param {*} isForced 
 */
export function replaceOld(source, name, replacement, isForced = false) {
    if (name in source || isForced) {
        const original = source[name]
        const wrapped = replacement(original)
        if (typeof wrapped === 'function') {
            source[name] = wrapped
        }
    }
}

// 函数节流
/**
 *
 * ../param fn 需要节流的函数
 * ../param delay 节流的时间间隔
 * ../returns 返回一个包含节流功能的函数
 */
export const throttle = (fn, delay) => {
    let canRun = true
    return function (...args) {
        if (!canRun) return
        fn.apply(this, args)
        canRun = false
        setTimeout(() => {
            canRun = true
        }, delay)
    }
}

export const nativeToString = Object.prototype.toString

/**
 * 校验类型
 * @param {*} type 
 */
export function isType(type) {
    return function (value) {
        return nativeToString.call(value) === "[object " + type + "]";
    };
}



// 校验枚举
export const variableTypeDetection = {
    isNumber: isType('Number'),
    isString: isType('String'),
    isBoolean: isType('Boolean'),
    isNull: isType('Null'),
    isUndefined: isType('Undefined'),
    isSymbol: isType('Symbol'),
    isFunction: isType('Function'),
    isObject: isType('Object'),
    isArray: isType('Array'),
    isProcess: isType('process'),
    isWindow: isType('Window')
};

/**
 * 检查是否是空对象
 * ../param obj 待检测的对象
 */
export function isEmptyObject(obj) {
    return variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0
}

export function isEmpty(wat) {
    return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null
}

/**
 * Checks whether given value has a then function.
 * ../param wat A value to be checked.
 */
// export function isThenable(wat: any): boolean {
//   // tslint:disable:no-unsafe-any
//   return Boolean(wat && wat.then && typeof wat.then === 'function')
//   // tslint:enable:no-unsafe-any
// }

export function isExistProperty(obj, key) {
    return obj.hasOwnProperty(key)
}

/**
 * 添加事件监听器
 * @param {*} target 
 * @param {*} eventName 
 * @param {*} handler 
 * @param {*} opitons 
 */
export function on(target, eventName, handler, opitons = false) {
    target.addEventListener(eventName, handler, opitons)
}

/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {../link isError}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
export function isError(wat) {
    switch (nativeToString.call(wat)) {
        case '[object Error]':
            return true
        case '[object Exception]':
            return true
        case '[object DOMException]':
            return true
        default:
            return isInstanceOf(wat, Error)
    }
}

/**
* Checks whether given value's type is an instance of provided constructor.
* {../link isInstanceOf}.
*
* ../param wat A value to be checked.
* ../param base A constructor to be used in a check.
* ../returns A boolean representing the result.
*/
export function isInstanceOf(wat, base) {
    try {
        // tslint:disable-next-line:no-unsafe-any
        return wat instanceof base
    } catch (_e) {
        return false
    }
}

/**
 * 获取当前的时间戳
 * ../returns 返回当前时间戳
 */
export function getTimestamp() {
    return Date.now()
}

/**
 * 获取时间
 */
export function getTimestamp() {
    return new Date().getTime()
}