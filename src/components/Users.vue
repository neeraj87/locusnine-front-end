<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
            <i class="fas fa-arrow-up" v-if="sortOrder === 'asc'" v-on:click="sort('desc');"></i>
            <i class="fas fa-arrow-down" v-if="sortOrder === 'desc'" v-on:click="sort('asc');"></i>
          </th>
          <th class="text-left">Email</th>
          <th class="text-left">Role Type</th>
          <th class="text-left">Status</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <p v-if="user.role === 'ADMIN'">Admin</p>
            <p v-if="user.role === 'CUSTOMER_EXE'">Customer Executive</p>
          </td>
          <td>{{ user.status }}</td>
          <td>
            <v-btn color="blue darken-1" text @click="dialog = false" v-on:click="getUser(user._id)">Edit</v-btn>
            <v-btn color="red darken-1" text @click="dialog = false" v-on:click="deleteUser(user._id)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import UserService from '../UserService';
  export default {
    data () {
      return {
        users: [],
        error: '',
        name: '',
        email: '',
        mobile: '',
        sortOrder: 'asc',
        user: null
      }
    },
    mounted() {
      this.$root.$on('getallusers', async () => {
          this.users = await UserService.getUsers(this.sortOrder);
      });
    },
    async created() {
        try {
            this.users = await UserService.getUsers(this.sortOrder);
        } catch(err) {
            this.error = err.message;
        } 
    },
    methods: {
      async getUser(id) {
        this.user = await UserService.getSingleUser(id);
        this.$root.$emit('getuser', this.user);
      },
      async deleteUser(id) {
        await UserService.deleteUser(id);
        this.users = await UserService.getUsers(this.sortOrder);
      },
      async sort(order) {
        this.users = await UserService.getUsers(order);
        this.sortOrder = order;
      }
    },
  }
</script>