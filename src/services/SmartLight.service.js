const base = '/api'
const baseSmartLight = 'smartLight'
export default {
    getState: ($axios, data) => {
        return $axios.$get(`${base}/${data.blockchain}/${baseSmartLight}/getState`)
    },
    sendState: ($axios, data) => {
        return $axios.$post(`${base}/${data.blockchain}/${baseSmartLight}/sendState/${data.command}`)
    },
}