const handlers = {}
const appHandles = {}
const pageHandles = {}

/**
 * @param {*} handler 
 * @param {*} handleType 
 */
export function subscribeEvent(handler, handleType = '') {
    if (!handler) {
        return
    }
    switch (handleType) {
        case 'app':
            appHandles[handler.type] = appHandles[handler.type] || []
            appHandles[handler.type].push(handler.callback)
            break
        case 'page':
            pageHandles[handler.type] = appHandles[handler.type] || []
            pageHandles[handler.type].push(handler.callback)
            break
        default:
            handlers[handler.type] = handlers[handler.type] || []
            handlers[handler.type].push(handler.callback)
    }

}

/**
 * @param {*} type 
 * @param {*} data 
 * @param {*} handleType
 */
export function triggerHandlers(type, data, handleType = '') {
    switch (handleType) {
        case 'app':
            if (!type || !appHandles[type]) return
            appHandles[type].forEach((callback) => {
                callback(data)
            })
            break
        case 'page':
            if (!type || !pageHandles[type]) return
            pageHandles[type].forEach((callback) => {
                callback(data)
            })
            break
        default:
            if (!type || !handlers[type]) return
            handlers[type].forEach((callback) => {
                callback(data)
            })
    }
}

