
/**
 * http 错误
 */
export const HTTP_CODE = {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_EXCEPTION = 500
}

const globalVar = {
    isLogAddBreadcrumb: true,
    crossOriginThreshold: 1000
}
export { globalVar }