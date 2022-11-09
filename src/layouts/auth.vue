<template>
  <v-app app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list
        nav
        dense>
        <v-list-item-group>
          <v-list-item
            active-class="deep-purple--text text--accent-4"
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="deep-purple"
      :clipped-left="clipped"
      fixed
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-menu offset-y z-index="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list
        min-width="150">
          <v-list-item
            :to="'/'"
            router
            exact>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Landing</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
  data () {
    return {
      clipped: true,
      drawer: true,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-apps',
          title: 'Cerradura Inteligente',
          to: '/devices/smart-lock'
        },
        {
          icon: 'mdi-apps',
          title: 'Foco Inteligente',
          to: '/devices/smart-light'
        },
        {
          icon: 'mdi-apps',
          title: 'LED',
          to: '/devices/led'
        }
      ],
      title: 'BCIOT'
    }
  }
}
</script>
<style lang="scss">
.v-list-item:hover{
  color: #6200ea !important;
  caret-color: #6200ea !important;
  background-color: #6200ea19;
  .v-icon{
    color: #6200ea !important;
    caret-color: #6200ea !important;
  }
}
</style>
