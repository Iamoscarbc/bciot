import SmartLockService from '@/services/SmartLock.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getState({state, commit}, data){
        return await SmartLockService.getState(this.$axios, data)
    },
    async sendState({state, commit}, data){
        return await SmartLockService.sendState(this.$axios, data)
    },
}