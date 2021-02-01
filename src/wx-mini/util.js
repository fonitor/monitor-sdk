import { variableTypeDetection } from '../util/help'

/**
 * 
 * @param {*} delta 
 */
export function getNavigateBackTargetUrl(delta) {
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

/**
 * url
 * @param {*} url 
 * @param {*} query 
 */
export function setUrlQuery(url, query) {
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
 * 获取当前url
 */
export function getPage() {
    return getCurrentPages()[getCurrentPages().length - 1].__route__
}

