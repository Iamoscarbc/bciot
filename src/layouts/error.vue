<template>
  <v-app dark>
    <div class="d-flex flex-column align-center justify-center" style="height: 100vh">
      <div v-if="error.statusCode === 404">
        <lottie
          :width="550"
          :height="550"
          :options="lottieOptions"
          @animCreated="handleAnimation"
        />
      </div>
      <div v-else>
        {{ otherError }}
      </div>
      <NuxtLink to="/" class="font-size-40">
        Return to Home
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue"
import * as animationData from "@/assets/lotties/404.json";
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  components: {
    lottie,
  },
  props: {
    error: {
      type: Object,
      default: null,
      anim: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      lottieOptions: { animationData: animationData.default },
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 20px;
}
a{
  text-decoration: none;
  color: black;
  &:hover{
    text-decoration: underline;
  }
}
</style>
