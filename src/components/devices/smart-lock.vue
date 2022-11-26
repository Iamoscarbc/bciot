<template>
    <v-row justify="center" align="center">
      <v-col cols="12" class="d-flex flex-column align-start" v-if="!loading">
        <h2>Smart Lock</h2>
        <span>Estado: {{ stateLock.typeLock }}</span>
        <span v-if="duration">Último tiempo de ida y vuelta: {{ duration }}</span>
        <v-row>
          <v-col class="d-flex flex-column align-center">
            <v-icon class="font-size-220" color="green" v-if="stateLock.command == 'open'">mdi-door-open</v-icon>
            <v-icon class="font-size-220" color="red" v-else>mdi-door-closed-lock</v-icon>
            <v-btn 
            width="200"
            @click="sendStateService()"
            :color="nextLock.color">
              <v-icon>
                mdi-power
              </v-icon>
              {{ nextLock.text }}
            </v-btn>
          </v-col>
        </v-row>
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
  import { firestore } from '~/plugins/firebase.js'
  import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
  export default {
    name: 'SmartLockComponent',
    props:{
        blockchain: {
            type: String,
            default: 'Public'
        }
    },
    data(){
      return {
        stateLock: {
          command: 'open',
          typeLock: 'Cerradura desbloqueada'
        },
        values: ['open','close'],
        loading: true,
        duration: 0
      }
    },
    methods: {
      ...mapActions("smart-lock",['getState', 'sendState']),
      async getStateService(){
        try {
          this.loading = true
          let res = await this.getState({ blockchain: this.blockchain })
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
          let payload = {
            command: this.negativeValue,
            blockchain: this.blockchain
          }
          let res = await this.sendState(payload)
          if(res.status){
            this.duration = res.data.duration
            console.log("res.data", res.data)
            await this.createTransactions(res.data)
            await this.getStateService()
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      },
      async createTransactions({ duration, pcr }){
        const transactionsCollection = collection(firestore, 'transactions')
        const newDoc = await addDoc(transactionsCollection, {
          blockchain_type: this.blockchain,
          device:"SmartLock",
          duration,
          pcr,
          created_at: serverTimestamp()
        })
      }
    },
    computed: {
      negativeValue(){
        return this.values.filter(x => x != this.stateLock.command)[0]
      },
      nextLock(){
        if(this.stateLock.command == 'close'){
          return {
            text: 'Desbloquear',
            color: 'green'
          }
        }
        return {
          text: 'Bloquear',
          color: 'red'
        }
      }
    },
    async mounted() {
      await this.getStateService()
    }
  }
</script>