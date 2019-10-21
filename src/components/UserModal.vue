<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="yellow darken-3" dark v-on="on">
          <i class="fas fa-plus"></i> Add User
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field type="hidden" v-model="id"></v-text-field>
                <v-text-field label="Name" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" v-model="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Mobile" v-model="mobile" required></v-text-field>
              </v-col>
              <v-radio-group v-model="role" row>
                  <v-radio label="Admin" value="ADMIN" name="role"></v-radio>
                  <v-radio label="Customer Executive" value="CUSTOMER_EXE" name="role"></v-radio>
              </v-radio-group>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false" v-on:click="saveUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import UserService from '../UserService';
  export default {
    data () {
      return {
        dialog: false,
        id: '',
        name: '',
        email: '',
        mobile: '',
        role: 'ADMIN',
        users: []
      }
    },
    mounted() {
      this.$root.$on('getuser', async (user) => {
        console.log('user: ' + JSON.stringify(user));
        this.name = user.name;
        this.email = user.email;
        this.mobile = user.mobile;
        this.id = user._id;
        this.role = user.role;
        this.dialog = true;
      });
    },
    methods: {
        async saveUser() {
          if(this.id === '') {
            await UserService.insertUser(this.name, this.email, this.mobile);
          } else {
            await UserService.updateUser(this.name, this.email, this.mobile, this.role, this.id);
          }
          this.$root.$emit('getallusers');
        },
    },
  }
</script>