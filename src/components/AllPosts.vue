<template>
  <v-container fill-height style="height: 100vh" data-app>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div>
      <v-btn color="green lighten-2 mx-4" dark @click="dialog = true">
        Create Post
      </v-btn>
      <v-btn color="red lighten-2 mx-4" dark @click="logout()"> Log out </v-btn>
      <v-dialog persistent v-model="dialog">
        <v-card style="min-width: 500px">
          <v-icon
            style="position: absolute; right: 5px; top: 5px"
            @click="dialog = false"
            >mdi-close</v-icon
          >
          <v-card-title> Create Post </v-card-title>

          <v-card-text>
            <v-text-field
              label="Title"
              :rules="rules"
              hide-details="auto"
              v-model="title"
            ></v-text-field>
            <v-text-field
              label="Body"
              :rules="rules"
              hide-details="auto"
              v-model="body"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="loadingbtn" color="primary" @click="postthpost()">
              POST
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-row v-for="(item, i) in posts" :key="i">
      <v-col> </v-col>
      <v-col>
        <MyCard :myitem="item"></MyCard>
      </v-col>
      <v-col> </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ "Post Created" }}
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
import MyCard from "./MyCard.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    MyCard,
    // HelloWorld,
  },
  data() {
    return {
      posts: [],
      dialog: false,
      loadingbtn: false,
      title: "",
      body: "",
      overlay: false,
      snackbar: false,
      user: "",
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 0) || "Min 3 characters",
      ],
    };
  },
  created() {
    this.user = localStorage.getItem("userID");
    this.user = JSON.parse(this.user);

    this.overlay = true;
    this.axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${this.user.id}`)
      .then((data: any) => {
        this.posts = data.data;
        console.log(this.posts);
        this.overlay = false;
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    postthpost() {
      this.loadingbtn = true;
      if (this.title == "" || this.body == "") {
        this.loadingbtn = false;
        return false;
      }
      this.axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          title: this.title,
          body: this.body,
          userId: this.user.id,
        })
        .then((res) => {
          this.loadingbtn = false;
          this.dialog = false;
          this.snackbar = true;
        });
    },
  },
});
</script>

<style scoped>
.blue-back {
  background-color: bisque;
}
</style>