
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