const base = '/api'
const baseSmartLock = 'smartLock'
export default {
    getState: ($axios, data) => {
        return $axios.$get(`${base}/${data.blockchain}/${baseSmartLock}/getState`)
    },
    sendState: ($axios, data) => {
        return $axios.$post(`${base}/${data.blockchain}/${baseSmartLock}/sendState/${data.command}`)
    },
}