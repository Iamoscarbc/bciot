<template>
  <v-app>
    <v-app-bar
        fixed
        height="240"
        elevation="0"
        app
        class="landing"
        @scroll="scrollAppBar()">
        <div class="d-flex flex-column">
            <img src="@/assets/img/logo.svg" style="width: 135px">
        </div>
        <div class="d-flex flex-column">
            <span class="font-size-36 font-weight-100" style="max-width: 200px; line-height: 1.25;">IOT Blockchain Integration</span>
        </div>
        <v-spacer />
        <div class="d-flex flex-column justify-center">
            <v-btn @click="$router.push('/dashboard')"
            elevation="0"
            height="60">
              <span class="font-size-36 font-weight-100 go-to-dashboard text-capitalize">Dashboard</span>
            </v-btn>
        </div>
    </v-app-bar>
    <v-main>
        <Nuxt />
    </v-main>
  </v-app>
</template>
  
<script>
  export default {
    name: 'LandingLayout',
    methods: {
      scrollAppBar(){
        javascript.void(0)
      }
    }
  }
</script>

<style lang="scss">
  .v-app-bar.landing{
    padding: 0px 130px;
    .v-toolbar__content{
      padding: 0;
      overflow-x: hidden;
      overflow-y: hidden;
    }
  }
  .go-to-dashboard{
    max-width: 200px;
    line-height: 1.25;
    cursor: pointer;
  }
</style>