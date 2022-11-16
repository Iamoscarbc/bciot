const base = '/api'
const baseLed = 'LED'
export default {
    getState: ($axios, data) => {
        return $axios.$get(`${base}/${data.blockchain}/${baseLed}/getState`)
    },
    sendState: ($axios, data) => {
        return $axios.$post(`${base}/${data.blockchain}/${baseLed}/sendState/${data.command}`)
    },
}