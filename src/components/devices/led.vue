<template>
    <v-row justify="center" align="center">
      <v-col cols="12" class="d-flex flex-column" v-if="!loading">
        <v-toolbar
          class="mb-4 rounded-lg"
          :dark="true"
          :color="blockchain == 'Private' ? '#ff5722' : 'primary'"
        >
          <v-toolbar-title>{{blockchain}}</v-toolbar-title>
        </v-toolbar>
        <h2>LED</h2>
        <span>Estado: {{ stateLight.typeLight }}</span>
        <span v-if="duration">Último tiempo de ida y vuelta: {{ duration }}</span>
        <v-btn 
        width="120"
        @click="sendStateService()"
        :color="nextLight.color">
          <v-icon>
            mdi-power
          </v-icon>
          {{ nextLight.text }}
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
  import { firestore } from '~/plugins/firebase.js'
  import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
  export default {
      name: 'LEDComponent',
      props:{
          blockchain: {
              type: String,
              default: 'Public'
          }
      },
      data(){
        return {
          stateLight: {
            command: 'Encender',
            typeLight: ''
          },
          values: ['Apagar','Encender'],
          loading: true,
          duration: 0
        }
      },
      methods: {
        ...mapActions("led",['getState', 'sendState']),
        async getStateService(){
          try {
            this.loading = true
            let res = await this.getState({ blockchain: this.blockchain })
            if(res.status){
              this.stateLight = res.data
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
            device:"LED",
            duration,
            pcr,
            created_at: serverTimestamp()
          })
        }
      },
      computed: {
        negativeValue(){
          return this.values.filter(x => x != this.stateLight.command)[0]
        },
        nextLight(){
          if(this.stateLight.command == 'Apagar'){
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