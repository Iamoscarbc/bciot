<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="d-flex flex-column" v-if="!loading">
      <h2>Smart Lock</h2>
      <span>Estado: {{ stateLock.typeLock }}</span>
      <v-btn 
      width="120"
      @click="sendStateService()"
      :color="nextLock.color">
        <v-icon>
          mdi-power
        </v-icon>
        {{ nextLock.text }}
      </v-btn>
    </v-col>
    <v-col cols="12" class="d-flex flex-column" v-else>
      <v-progress-circular
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SmartLockPage',
  layout: 'auth',
  data(){
    return {
      stateLock: '',
      values: ['Rojo','Verde'],
      loading: true
    }
  },
  methods: {
    ...mapActions("smart-lock",['getState', 'sendState']),
    async getStateService(){
      try {
        this.loading = true
        let res = await this.getState()
        if(res.status){
          this.stateLock = res.data
        }
      } catch (error) {
        console.log("error", error)
      } finally {
        this.loading = false
      }
    },
    async sendStateService(){
      try {
        this.loading = true
        let res = await this.sendState(this.negativeValue)
        if(res.status){
          console.log("res", res)
        }
      } catch (error) {
        console.log("error", error)
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    negativeValue(){
      return this.values.filter(x => x != this.stateLock.comando)[0]
    },
    nextLock(){
      if(this.stateLock.comando == 'Rojo'){
        return {
          text: 'Encender',
          color: 'green'
        }
      }
      return {
        text: 'Apagar',
        color: 'red'
      }
    }
  },
  async mounted() {
    await this.getStateService()
  }
}
</script>
