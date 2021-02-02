/**
 * 获取当前url
 */
export function getPage() {
    return getCurrentPages()[getCurrentPages().length - 1].route || ""
}