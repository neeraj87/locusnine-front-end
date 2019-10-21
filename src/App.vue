<template>
  <v-app>
    <v-app-bar color="blue-grey darken-4" dark app>
      <v-toolbar-title class="headline text-uppercase">
        <span>locusnine</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="#"
        target="_blank"
      >
        <span class="mr-2">John Smith</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-row>
        <v-col cols="12">
        <!-- <i class="fas fa-users"></i> -->
          <UserModal/>
        </v-col>
        <v-col cols="12">
          <Users/>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import Users from './components/Users';
import UserModal from './components/UserModal';

export default {
  name: 'App',
  components: {
    Users,
    UserModal
  },
  data: () => ({
    //
  }),
};
</script>
