
const handlers = {}

/**
 * @param {*} handler 
 */
export function subscribeEvent(handler) {
    if (!handler) {
        return
    }
    handlers[handler.type] = handlers[handler.type] || []
    handlers[handler.type].push(handler.callback)
}

/**
 * @param {*} type 
 * @param {*} data 
 */
export function triggerHandlers(type, data) {
    if (!type || !handlers[type]) return
    handlers[type].forEach((callback) => {
        callback(data)
    })
}

