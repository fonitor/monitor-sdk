
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