import { ERRORTYPES } from './constant'


/**
 * 获取web 设备信息
 */
export function getDevice() {
    let device = {},
        ua = navigator.userAgent
    /** @type {(Array<string>|null)} */
    let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    /** @type {(Array<string>|null)} */
    let showEffects = ua.match(/(iPad).*OS\s([\d_]+)/);
    /** @type {(Array<string>|null)} */
    let showPackageConstants = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    /** @type {(Array<string>|boolean|null)} */
    let showConstants = !showEffects && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    /** @type {(Array<string>|null)} */
    let cache_message = ua.match(/Android\s[\S\s]+Build\//);

    if (android && (device.os = "android", device.osVersion = android[2], device.android = true, device.androidChrome = 0 <= ua.toLowerCase().indexOf("chrome")), (showEffects || showConstants || showPackageConstants) && (device.os = "ios", device.ios = true), showConstants && !showPackageConstants && (device.osVersion = showConstants[2].replace(/_/g, "."), device.iphone = true), showEffects && (device.osVersion = showEffects[2].replace(/_/g, "."), device.ipad = true), showPackageConstants && (device.osVersion = showPackageConstants[3] ? showPackageConstants[3].replace(/_/g, ".") : null, device.iphone = true), device.ios && device.osVersion && 0 <= ua.indexOf("Version/") && "10" === device.osVersion.split(".")[0] && (device.osVersion = ua.toLowerCase().split("version/")[1].split(" ")[0]), device.iphone) {
        /** @type {string} */
        device.deviceName = "iphone";
        var beginWidth = window.screen.width;
        var upperHeight = window.screen.height;
        if (320 === beginWidth && 480 === upperHeight) {
            /** @type {string} */
            device.deviceName = "iphone 4";
        } else {
            if (320 === beginWidth && 568 === upperHeight) {
                /** @type {string} */
                device.deviceName = "iphone 5/SE";
            } else {
                if (375 === beginWidth && 667 === upperHeight) {
                    /** @type {string} */
                    device.deviceName = "iphone 6/7/8";
                } else {
                    if (414 === beginWidth && 736 === upperHeight) {
                        /** @type {string} */
                        device.deviceName = "iphone 6/7/8 Plus";
                    } else {
                        if (375 === beginWidth && 812 === upperHeight) {
                            /** @type {string} */
                            device.deviceName = "iphone X/S/Max";
                        }
                    }
                }
            }
        }
    } else {
        if (device.ipad) {
            /** @type {string} */
            device.deviceName = "ipad";
        } else {
            if (cache_message) {
                /** @type {string} */
                var d = cache_message[0].split(";")[1].replace(/Build\//g, "");
                /** @type {string} */
                device.deviceName = d.replace(/(^\s*)|(\s*$)/g, "");
            }
        }
    }
    if (-1 == ua.indexOf("Mobile")) {
        /** @type {string} */
        let ua = navigator.userAgent.toLowerCase();
        if (device.browserName = "\u672a\u77e5", 0 < ua.indexOf("msie")) {
            /** @type {string} */
            var assignmentUrl = ua.match(/msie [\d.]+;/gi)[0];
            /** @type {string} */
            device.browserName = assignmentUrl.split("/")[0];
            /** @type {string} */
            device.browserVersion = assignmentUrl.split("/")[1];
        }
        if (0 < ua.indexOf("firefox")) {
            /** @type {string} */
            assignmentUrl = ua.match(/firefox\/[\d.]+/gi)[0];
            /** @type {string} */
            device.browserName = assignmentUrl.split("/")[0];
            /** @type {string} */
            device.browserVersion = assignmentUrl.split("/")[1];
        }
        if (0 < ua.indexOf("safari") && ua.indexOf("chrome") < 0) {
            /** @type {string} */
            assignmentUrl = ua.match(/safari\/[\d.]+/gi)[0];
            /** @type {string} */
            device.browserName = assignmentUrl.split("/")[0];
            /** @type {string} */
            device.browserVersion = assignmentUrl.split("/")[1];
        }
        if (0 < ua.indexOf("chrome")) {
            /** @type {string} */
            assignmentUrl = ua.match(/chrome\/[\d.]+/gi)[0];
            /** @type {string} */
            device.browserName = assignmentUrl.split("/")[0];
            /** @type {string} */
            device.browserVersion = assignmentUrl.split("/")[1];
        }
    }

    device.webView = (showConstants || showEffects || showPackageConstants) && ua.match(/.*AppleWebKit(?!.*Safari)/i)

    return device;
}

export function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null) return ''
    return document.location.href
}

/**
 * 解析error的stack，并返回args、column、line、func、url:
 * @param ex
 */
export function extractErrorStack(ex) {
    const normal = {
        name: ex.name,
        message: ex.message
    }
    if (typeof ex.stack === 'undefined' || !ex.stack) {
        return normal
    }
    const chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
        gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
        winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
        // Used to additionally parse URL/line/column from eval frames
        geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
        chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/,
        lines = ex.stack.split('\n'),
        stack = []
    let submatch, parts, element
    // reference = /^(.*) is undefined$/.exec(ex.message)

    for (let i = 0, j = lines.length; i < j; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
          const isNative = parts[2] && parts[2].indexOf('native') === 0 // start of line
          const isEval = parts[2] && parts[2].indexOf('eval') === 0 // start of line
          if (isEval && (submatch = chromeEval.exec(parts[2]))) {
            // throw out eval line/column and use top-most line/column number
            parts[2] = submatch[1] // url
            parts[3] = submatch[2] // line
            parts[4] = submatch[3] // column
          }
          element = {
            url: !isNative ? parts[2] : null,
            func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
            args: isNative ? [parts[2]] : [],
            line: parts[3] ? +parts[3] : null,
            column: parts[4] ? +parts[4] : null
          }
        } else if ((parts = winjs.exec(lines[i]))) {
          element = {
            url: parts[2],
            func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
            args: [],
            line: +parts[3],
            column: parts[4] ? +parts[4] : null
          }
        } else if ((parts = gecko.exec(lines[i]))) {
          const isEval = parts[3] && parts[3].indexOf(' > eval') > -1
          if (isEval && (submatch = geckoEval.exec(parts[3]))) {
            // throw out eval line/coluqqqqqqqqqqqqqqqqqqqqqqqqqqqqmn and use top-most line number
            parts[3] = submatch[1]
            parts[4] = submatch[2]
            parts[5] = null // no column when eval
          } else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
            // FireFox uses this awesome columnNumber property for its top frame
            // Also note, Firefox's column number is 0-based and everything else expects 1-based,
            // so adding 1
            // NOTE: this hack doesn't work if top-most frame is eval
            stack[0].column = ex.columnNumber + 1
          }
          element = {
            url: parts[3],
            func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
            args: parts[2] ? parts[2].split(',') : [],
            line: parts[4] ? +parts[4] : null,
            column: parts[5] ? +parts[5] : null
          }
        } else {
          continue
        }
    
        if (!element.func && element.line) {
          element.func = ERRORTYPES.UNKNOWN_FUNCTION
        }
    
        stack.push(element)
      }
      if (!stack.length) {
        return null
      }
      return {
        ...normal,
        stack: stack
      }

    return normal
}