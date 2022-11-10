<template>
  <v-app app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item-group>
          <template v-for="item in items">
            <v-list-item v-if="!item.path"
            active-class="deep-purple--text text-accent-4"
            :key="item.title"
            :prepend-icon="item.icon"
            :to="item.to"
            router>
              <v-list-item-avatar>
                <v-icon>
                  {{item.icon}}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
            <v-list-group v-if="!!item.path"
            :active-class="item.class"
            :key="item.title"
            group>
              <template v-slot:activator>
                <v-list-item-avatar>
                  <v-icon :class="item.class">
                    {{item.icon}}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title :class="item.class" v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                active-class="deep-purple--text text-accent-4"
                v-for="child in item.items"
                :key="child.title"
                :to="item.path+child.to"
                router
              >
                <v-list-item-avatar>
                  <v-icon>
                    {{child.icon}}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="child.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </template>
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
          icon: 'mdi-lock',
          title: 'Private Blockchain',
          path: '/devices/private',
          class: 'deep-orange--text',
          items:[
            {
              icon: 'mdi-apps',
              title: 'Cerradura Inteligente',
              to: '/smart-lock'
            },
            {
              icon: 'mdi-apps',
              title: 'Foco Inteligente',
              to: '/smart-light'
            },
            {
              icon: 'mdi-apps',
              title: 'LED',
              to: '/led'
            }
          ]
        },
        {
          icon: 'mdi-lock-open',
          title: 'Public Blockchain',
          path: '/devices/public',
          class: 'primary--text',
          items:[
            {
              icon: 'mdi-apps',
              title: 'Cerradura Inteligente',
              to: '/smart-lock'
            },
            {
              icon: 'mdi-apps',
              title: 'Foco Inteligente',
              to: '/smart-light'
            },
            {
              icon: 'mdi-apps',
              title: 'LED',
              to: '/led'
            }
          ]
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
    color: #6200ea;
    caret-color: #6200ea;
  }
}
</style>
