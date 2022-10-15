const base = '/api/smartLock'
export default {
    getState: ($axios, data) => {
        return $axios.$get(`${base}/getState`, data)
    },
    sendState: ($axios, data) => {
        return $axios.$post(`${base}/sendState/${data}`)
    },
}