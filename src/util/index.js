/**
 * 校验类型
 * @param {*} type 
 */
function isType(type) {
    return function (value) {
        return nativeToString.call(value) === "[object " + type + "]";
    };
}

// 校验枚举
const variableTypeDetection = {
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
 * 生成用户唯一标识码
 */
function generateUUID() {
    let uuid = '',
        d = new Date().getTime()

    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })

    return uuid
}

function getCwarn() {
    let t = "object" == typeof console ? console.warn : noop;
    try {
        let e = {
            warn: t
        };
        e.warn.call(e)
    } catch (n) {
        return noop
    }
    return t
}

/**
 * encodeURIComponent 转换
 * @param {*} t 
 * @param {*} e 
 */
function encode(t, e) {
    try {
        t = e ? encodeURIComponent(t).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(t)
    } catch (n) { }
    return t
}

/**
 * 字符串替换
 * @param {*} str 
 * @param {*} find 
 * @param {*} replace 
 */
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


/**
 * @param {*} t 
 */
function ext(t) {
    for (let e = 1, n = arguments.length; e < n; e++) {
        let r = arguments[e];
        for (let o in r) {
            Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o])
        }
    }
    return t
}

/**
 * 日期格式化
 * @param {*} date 
 * @param {*} fmt 
 */
function dateFormat(date, fmt) {
    if (!date || !(date instanceof Date)) {
        return "";
    }
    var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 合并
 */
function __assign() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * 获取当前url
 */
function getPage() {
    return getCurrentPages()[getCurrentPages().length - 1].__route__
}

/**
 * url
 * @param {*} url 
 * @param {*} query 
 */
function setUrlQuery(url, query) {
    var queryArr = [];
    Object.keys(query).forEach(function (k) {
        queryArr.push(k + "=" + query[k]);
    });
    if (url.indexOf('?') !== -1) {
        url = url + "&" + queryArr.join('&');
    }
    else {
        url = url + "?" + queryArr.join('&');
    }
    return url;
}

/**
 * 
 * @param {*} delta 
 */
function getNavigateBackTargetUrl(delta) {
    if (!variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    delta = delta || 1;
    var toPage = pages[pages.length - delta];
    return setUrlQuery(toPage.route, toPage.options);
}

let warn = getCwarn

export default {
    ext,
    warn,
    encode,
    replaceAll,
    generateUUID,
    dateFormat,
    getPage,
    getNavigateBackTargetUrl,
    __assign
}