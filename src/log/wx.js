
import wxQueue from '../queue/wx'
import mpExtend from '../util/mp-extend'
import util from '../util/index'
const baseConfig = {
    baseUrl: '',
    autoReportApi: true, // 是否上报api 
    autoReportPage: true, // 是否上报页面信息
    autoReportPagePerformance: true, // 是否上报页面性能
}

mpExtend.baseOptions = '' // 初始化上传参数
mpExtend.referrerPage = ''

const type = 2 // 代表微信小程序
const projectVersion = '1.0.0' // 项目版本号

/**
 * 初始化上传参数
 * @param {*} option 
 */
function initBaseOptions(option) {
    // 初始化上传参数
    wx.getSystemInfo({
        success: (res) => {
            mpExtend.baseOptions = {
                app: option.app || "",
                type, // 代表微信小程序
                projectVersion, // 项目版本号
                customerKey: util.generateUUID(), // 会话id
                pageKey: option.pageKey || "", // 用户标识
                os: res.system, // 系统信息
                deviceName: res.model, // 手机型号
                brand: res.brand, // 手机品牌
                browserVersion: res.version, // 小程序版本号
            }
        }
    });
    
}

/**
 * 获取当前url
 */
function getPage() {
    return getCurrentPages()[getCurrentPages().length - 1].__route__
}


/**
 * 上传日志
 * @param {*} type 
 * @param {*} data 
 */
function logSave(type, data) {
    let useData,
        logData = JSON.parse(JSON.stringify(data))
    if (!mpExtend.baseOptions) {
        initBaseOptions(mpExtend.options)
        setTimeout(() => {
            logSave(type, data)
        }, 500)
        return
    }
    switch (type) {
        case 'page_pv':
            useData = Object.assign(logData, mpExtend.baseOptions)
            useData.uploadType = type
            mpExtend.queue.pushToQueue(useData)
            break
        case 'js_error':
            useData = Object.assign(logData, mpExtend.baseOptions)
            useData.uploadType = type
            mpExtend.queue.pushToQueue(useData)
            break
        case 'http_log':
            useData = Object.assign(logData, mpExtend.baseOptions)
            useData.uploadType = type
            mpExtend.queue.pushToQueue(useData)
            break
        default:

    }
}

const addHook = function (options) {
    if (wx && options && options.autoReportApi) {
        let startTime = new Date().getTime()
        wx._request = function (e) {
            let _e = e
            let _fail = _e.fail || "",
                _success = _e.success || "",
                _complete = _e.complete || ""
            _e.fail = function (error) {
                !!_fail && _fail(error)
                try {
                    let data = {
                        httpUrl: e.url,
                        httpUploadType: 2,
                        responseText: JSON.stringify(error),
                    }
                    logSave('http_log', data)
                } catch (e) {
                    util.warn('[cloudMonitor] http error')
                }
            }
            _e.success = function (success) {
                !!_success && _success(success)
                try {
                    // 上报接口报警
                    if (!!success && success.statusCode && success.statusCode != 200) {
                        let data = {
                            httpUrl: _e.url,
                            httpUploadType: 2,
                            responseText: JSON.stringify(success),
                        }
                        logSave('http_log', data)
                    } else {
                        let endTime = new Date().getTime()
                        let consumeData = {
                            loadTime: endTime - startTime,
                            httpUrl: _e.url,
                            httpUploadType: 1,
                            responseText: JSON.stringify(success),
                        }
                        logSave('http_log', consumeData)
                    }
                } catch (e) {
                    console.log('测试')
                    console.log(e)
                    util.warn('[cloudMonitor] http error')
                }
            }
            _e.complete = function (complete) {
                !!_complete && _complete(complete)
            }
            wx.request(_e)
        }
    }
}

const performanceInit = function () {
    if (wx.canIUse('getPerformance')) {
        const performance = wx.getPerformance()
        const observer = performance.createObserver((entryList) => {
            let res = entryList.getEntries() || []
            if (res.length == 0) {
                return
            }
            res.forEach((item) => {
                if (item) {
                    let {
                        entryType = '', duration = 0, name = '', path = '', moduleName = ''
                    } = item
                    if (entryType == 'render' && duration && path) {
                        log.reportPerformance(trackRenderPerformance['render'], duration, path)
                        log.reportPerformance(trackRenderPerformance['firstRender'], duration, path)
                    } else if (entryType == 'navigation' && duration && path) {
                        log.reportPerformance(trackRenderPerformance['navigation'], duration, path)
                        if (name == 'appLaunch') {
                            log.reportPerformance(trackRenderPerformance['appLaunch'], duration, path)
                        } else if (name == 'route') {
                            log.reportPerformance(trackRenderPerformance['route'], duration, path)
                        }
                    } else if (entryType == 'script' && duration && moduleName) {
                        log.reportPerformance(trackRenderPerformance['evaluateScript'], duration, moduleName)
                    }
                }
            })
        })
        observer.observe({
            entryTypes: ['navigation', 'render', 'script']
        })
    } else {
        return
    }
}

const memoryWarning = () => {
    if (wx.canIUse('onMemoryWarning')) {
        try {
            wx.onMemoryWarning((res) => {
                let level = 1,
                    route = '';

                if (!!res && !!res.level) {
                    level = res.level
                }
                let pages = getCurrentPages()
                if (pages && pages.length > 0) {
                    route = getCurrentPages()[getCurrentPages().length - 1].__route__
                    log.reportPerformance(trackRenderPerformance['memoryWarning'], level, route)
                }
            })
        } catch (error) {

        }
    }
}

let pagesPerformance = function (options) {
    if (!options || !options.autoReportPagePerformance) {
        return
    }

}

const defaultInit = {
    App: {
        onError(e) {
            try {
                let data = {
                    simpleUrl: getPage(),
                    errorMessage: String(e)
                }
                logSave('js_error', data)
            }catch(err) {
                util.warn('[cloudMonitor] JavaScript error')
            }
           
        }
    },
    Page: {
        onShow() {
            if (mpExtend.options.autoReportPage) {
                try {
                    let data = {
                        simpleUrl: this.__route__,
                        referrer: mpExtend.referrerPage,
                    }
                    logSave('page_pv', data)
                    mpExtend.referrerPage = this.__route__
                } catch (err) {
                    
                }
            }
        }
    }
}

/**
 * 初始化参数
 * @param {*} options 
 */
mpExtend.init = function (options) {
    if (!options || !options.app) {
        util.warn('[cloudMonitor] not set app')
    }
    if (!options || !options.baseUrl) {
        util.warn('[cloudMonitor] not set baseUrl')
    }
    let _options = Object.assign(baseConfig, options)
    this.options = _options
    addHook(_options)
    pagesPerformance(_options)
    initBaseOptions(_options)
    // 初始化消息队列
    mpExtend.queue = wxQueue.getInstance(_options.baseUrl)
}

mpExtend(defaultInit)

export default mpExtend