import SmartLightService from '@/services/SmartLight.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getState({state, commit}, data){
        return await SmartLightService.getState(this.$axios, data)
    },
    async sendState({state, commit}, data){
        return await SmartLightService.sendState(this.$axios, data)
    },
}