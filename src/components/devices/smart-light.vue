<template>
    <v-row justify="center" align="center">
      <v-col cols="12" class="d-flex flex-column" v-if="!loading">
        <h2>Smart Light</h2>
        <span>Estado: {{ stateLight.typeLight }}</span>
        <span v-if="duration">Último tiempo de ida y vuelta: {{ duration }}</span>
        <v-row>
          <v-col cols="3" class="d-flex flex-column align-center">
            <v-icon class="font-size-220" :color="colorForIcon" v-if="stateLight.typeLight != 'Apagado'">mdi-lightbulb-on</v-icon>
            <v-icon class="font-size-220" v-else>mdi-lightbulb-off</v-icon>
            <v-btn v-if="stateLight.typeLight != 'Apagado'"
            class="mt-5"
            width="120"
            @click="sendStateService('Apagar')"
            color="red">
              <v-icon>
                mdi-power
              </v-icon>
              {{ nextLight.text }}
            </v-btn>
          </v-col>
          <v-col cols="3">
            <ColorPicker :hue="color.hue" @input="onInput" @select="onSelect"></ColorPicker>
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
  import ColorPicker from '@/lib/ColorPicker.vue';
  import { firestore } from '~/plugins/firebase.js'
  import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
  export default {
    name: 'SmartLightComponent',
    components: { ColorPicker },
    props:{
        blockchain: {
            type: String,
            default: 'Public'
        }
    },
    data(){
      return {
        color: {
          hue: 50,
          saturation: 100,
          luminosity: 50,
          alpha: 1,
          rgb: 0,
        },
        stateLight: {
          typeLight: "Apagado"
        },
        values: ['Rojo','Verde'],
        loading: true,
        duration: 0
      }
    },
    methods: {
      ...mapActions("smart-light",['getState', 'sendState']),
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
      async sendStateService(rgb){
        try {
          this.loading = true
          let payload = {
            command: rgb,
            blockchain: this.blockchain
          }
          let res = await this.sendState(payload)
          if(res.status){
            this.duration = res.data.duration
            await this.createTimes(res.data)
            await this.getStateService()
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      },
      onInput(value) { 
        this.color.hue = value
        let { hue, saturation, luminosity} = this.color
        this.color.rgb = this.hslToRgb(hue, saturation, luminosity)
      },
      async onSelect(value) {
        let { r, g, b } = this.color.rgb
        let rgb = `${r}:${g}:${b}`
        await this.sendStateService(rgb)
      },
      hslToRgb(h, s, l){
        let r, g, b
              if( h=="" ) h=0;
              if( s=="" ) s=0;
              if( l=="" ) l=0;
              h = parseFloat(h);
              s = parseFloat(s);
              l = parseFloat(l);
              if( h<0 ) h=0;
              if( s<0 ) s=0;
              if( l<0 ) l=0;
              if( h>=360 ) h=359;
              if( s>100 ) s=100;
              if( l>100 ) l=100;
              s/=100;
              l/=100;
              let C = (1-Math.abs(2*l-1))*s;
              let hh = h/60;
              let X = C*(1-Math.abs(hh%2-1));
              r = g = b = 0;
              if( hh>=0 && hh<1 )
              {
                  r = C;
                  g = X;
              }
              else if( hh>=1 && hh<2 )
              {
                  r = X;
                  g = C;
              }
              else if( hh>=2 && hh<3 )
              {
                  g = C;
                  b = X;
              }
              else if( hh>=3 && hh<4 )
              {
                  g = X;
                  b = C;
              }
              else if( hh>=4 && hh<5 )
              {
                  r = X;
                  b = C;
              }
              else
              {
                  r = C;
                  b = X;
              }
              let m = l-C/2;
              r += m;
              g += m;
              b += m;
              r *= 255.0;
              g *= 255.0;
              b *= 255.0;
              r = Math.round(r);
              g = Math.round(g);
              b = Math.round(b);
              let hex = r*65536+g*256+b;
              hex = hex.toString(16,6);
              let len = hex.length;
              if( len<6 )
                  for(let i=0; i<6-len; i++)
                      hex = '0'+hex;
        return {r,g,b}
      },
      async createTimes({ duration }){
        const timesCollection = collection(firestore, 'times')
        const newDoc = await addDoc(timesCollection, {
          blockchain_type: this.blockchain,
          device:"SmartLight",
          duration: duration,
          created_at: serverTimestamp()
        })
      },
    },
    computed: {
      negativeValue(){
        return this.values.filter(x => x != this.stateLight.command)[0]
      },
      nextLight(){
        if(this.stateLight.command == 'Rojo'){
          return {
            text: 'Encender',
            color: 'green'
          }
        }
        return {
          text: 'Apagar',
          color: 'red'
        }
      },
      colorForIcon(){
        let { r, g, b } = this.color.rgb
        let rgb = `${r}:${g}:${b}`
        return `rgb(${r},${g},${b})`
      }
    },
    async mounted() {
      await this.getStateService()
      await this.onInput(50)
    }
  }
  </script>
  