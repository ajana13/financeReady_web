<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer v-model="drawer" floating temporary app>
      <v-list dense rounded>
        <v-list-item v-for="item in items" :key="item.title" link @click="routeTo(item.route)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Navivgation bar (header) -->
    <v-app-bar
      absolute
      color="lightgrey"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-home', route: '/' },
      { title: 'Calendar', icon: 'mdi-calendar', route: '/calendar' },
      { title: 'About', icon: 'mdi-at', route: '/about' },
    ],
  }),
  methods: {
    routeTo(newPath) {
      this.$router.push({ path: newPath })
    },
  },
}
</script>
