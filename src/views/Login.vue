<template>
  <v-container fill-height style="height: 100vh">
    <v-row>
      <v-col> </v-col>
      <v-col>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
                v-model="email"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col> </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      absolute
      centered
      right
      tile
      color="red accent-2"
    >
      User Not Exists
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
// import HelloWorld from "../components/HelloWorld.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    // HelloWorld,
  },
  data() {
    return {
      snackbar: false,
      email: "",
      usersList: [],
      tempUsers: [],
    };
  },
  created() {
    this.axios.get("https://jsonplaceholder.typicode.com/users").then((e) => {
      this.usersList = e.data;
      this.tempUsers = e.data;
      console.log(e.data);

      this.usersList = this.usersList.map((e) => {
        return e.email;
      });
      console.log(this.usersList);
    });
  },
  methods: {
    login() {
      if(this.email == "") return false;
      let curUser;
      if (this.usersList.includes(this.email)) {
        this.tempUsers.forEach((element) => {
          if (element.email == this.email) {
            curUser = element;
          }
        });
        this.$router.push("/posts");
      } else {
        this.snackbar = true;
        this.email = "";
        return false;
      }
      localStorage.setItem("userID", JSON.stringify(curUser));
    },
  },
});
</script>

<style scoped>
.blue-back {
  background-color: bisque;
}
</style>