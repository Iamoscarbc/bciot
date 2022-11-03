<template>
  <div class="fullpage-container">
    <div class="fullpage-wp" v-fullpage="opts" ref="example">
      <div class="page-1 page">
        <v-row class="align-center">
          <v-col>
            <h1 class="font-size-74 font-weight-900" style="max-width: 470px; line-height: 1.15;">Protege tu propiedad con nuestra Cerradura Blockchain.</h1>
            <v-btn class="mt-3"
            color="#9340ff"
            elevation="0"
            rounded
            max-width="360"
            width="100%"
            height="82">
              <span class="white--text font-size-36 font-weight-700" style="text-transform: capitalize;">Obtener ahora</span>
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <img src="@/assets/img/main.png" alt="">
          </v-col>
        </v-row>
      </div>
      <div class="page-2 page">
        <v-row>
          <v-col class="d-flex justify-center">
            <h1 class="font-size-74 font-weight-900 text-center" style="max-width: 80%;line-height: 1.15; color: #9340ff;">No es una cerradura común, si no un totalmente nuevo modo de proteger lo que te pertenece. Cerradura Blockchain es una revolucionaria cerradura habilitada con tecnología blockchain, y no puede ser hackeada.</h1>
          </v-col>
        </v-row>
      </div>
      <div class="page-3 page">
        <v-row class="align-center">
          <v-col>
            <h1 class="font-size-74 font-weight-900 mb-5" style="max-width: 650px; line-height: 1.15; color: #9340ff;">El futuro de las cerraduras.</h1>
            <div style="max-width: 700px;">
              <span class="font-size-24 font-weight-700">Gimarbot sac es la primera compañía en el mundo que produce esta cerradura que no es hackeable gracias a su integración con la tecnología blockchain. con un consumo de energía bajo, fácil proceso de instalación y todas las características que puedes encontrar en una cerradura inteligente de hoy en día. Es tranquilidad para aquellos que quieren asegurarse de que sus pertenencias estén siempre seguras.</span>
            </div>
          </v-col>
          <v-col class="d-flex justify-end">
            <img src="@/assets/img/main.png" alt="">
          </v-col>
        </v-row>
      </div>
      <div class="page-4 page">
        <v-row class="align-center">
          <v-col>
            <img src="@/assets/img/main.png" alt="">
          </v-col>
          <v-col>
            <h1 class="font-size-74 font-weight-900 mb-5" style="max-width: 850px; line-height: 1.15; color: #9340ff;">Dile adiós a perder las llaves.</h1>
            <div style="max-width: 700px;">
              <span class="font-size-24 font-weight-700"> Si estas cansado de perder las llaves, o de quedarte afuera porque las olvidaste. El futuro del acceso ha llegado. Cerradura Blockchain está diseñada para ser anti-hackeable te brinda acceso al instante con tan solo un toque a la pantalla de tu celular — sin importar que tan lejos de tu casa te encuentres.</span>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="page-5 page">
        <v-row class="align-center">
          <v-col>
            <h1 class="font-size-74 font-weight-900 mb-5" style="max-width: 650px; line-height: 1.15; color: #9340ff;">Su seguridad es imposible de romper.</h1>
            <div style="max-width: 600px;">
              <span class="font-size-24 font-weight-700">Hoy en día, confiamos en cerraduras que se pueden forzar o vulnerar. Los candados de cadena de bloques son 100% imposibles de piratear porque están integrados con la tecnología de cadena de bloques. El uso de blockchain en los dispositivos IoT es el futuro de la seguridad en línea.</span>
            </div>
          </v-col>
          <v-col class="d-flex justify-end">
            <img src="@/assets/img/main.png" alt="">
          </v-col>
        </v-row>
      </div>
      <div class="page-6 page">
        <v-row class="align-center">
          <v-col>
            <img src="@/assets/img/main.png" alt="">
          </v-col>
          <v-col>
            <h1 class="font-size-74 font-weight-900 mb-5" style="max-width: 650px; line-height: 1.15; color: #9340ff;">Seguridad blockchain para su hogar.</h1>
            <div style="max-width: 600px;">
              <span class="font-size-24 font-weight-700">Con Cerradura Blockchain, tendrá la tranquilidad de saber que sus pertenencias están a salvo de robos o manipulaciones. Nuestra misión es brindarle la máxima seguridad en su hogar u oficina.</span>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="page-7 page">
        <v-row class="align-center">
          <v-col>
            <img src="@/assets/img/main.png" alt="">
          </v-col>
          <v-col>
            <h1 class="font-size-74 font-weight-900 mb-5" style="max-width: 750px; line-height: 1.15; color: #9340ff;">Obtén la tranquilidad que buscas, solo con Cerradura Blockchain.</h1>
            <div style="max-width: 600px;">
              <span class="font-size-24 font-weight-700">Iconos</span>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <button @click="moveNext">next</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'landing',
  data() {
    return {
      opts: {
        start: 0,
        dir: 'v',
        duration: 500,
        beforeChange: function (currentSlideEl,currenIndex,nextIndex) {

        },
        afterChange: function (currentSlideEl,currenIndex) {

        }
      }
    }
  },
  methods:{
    moveNext(){
      this.$refs.example.$fullpage.moveNext(); //Move to the next page
    }
  }
}
</script>
<style lang="scss">
.fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0px 130px;
}
</style>