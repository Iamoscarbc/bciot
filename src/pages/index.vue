<template>
  <div class="fullpage-container">
    <div class="fullpage-wp" v-fullpage="opts" ref="example">
      <div class="page-1 page">
        <v-row>
          <v-col>
            <div class="d-flex">
              <div class="d-flex flex-column">
                <img src="@/assets/img/logo.png">
              </div>
              <div class="d-flex flex-column">
                <span class="font-size-37 white--text font-weight-900">Cerradura</span>
                <span class="font-size-37 white--text font-weight-900">blockchain</span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Cerradura Blockchain
          </v-col>
          <v-col>
            Cerradura Blockchain
          </v-col>
        </v-row>
      </div>
      <div class="page-2 page">
        <p class="part-2" v-animate="{value: 'bounceInRight'}">fullpage-vue 2</p>
      </div>
      <div class="page-3 page">
        <p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">fullpage-vue 3</p>
        <p class="part-3" v-animate="{value: 'bounceInRight', delay: 600}">fullpage-vue </p>
        <p class="part-3" v-animate="{value: 'zoomInDown', delay: 1200}">fullpage-vue</p>
      </div>
    </div>
    <button @click="moveNext">next</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
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
  .page{
    background-color: #101728;
    padding: 32px;
  }
}
</style>