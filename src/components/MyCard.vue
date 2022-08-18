<template>
  <v-card class="elevation-12" min-width="500px" max-width="500px">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ myitem.title }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      {{ myitem.body }}
      <v-text-field
        :type="'text'"
        name="input-10-1"
        label="Comment here..."
        :rules="rules"
        hide-details="auto"
        v-model="comment"
        :append-icon="comment ? 'mdi-send' : ''"
        @click:append="postthpost"
      ></v-text-field>
      <h5>Comments</h5>
      <v-card
        class="mx-auto mb-4"
        max-width="400"
        tile
        v-for="(cmt, index) in commentsArray"
        :key="index"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ cmt.email }}</v-list-item-title>
            <v-list-item-subtitle>{{ cmt.body }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-card-text>
    <v-snackbar v-model="snackbar">
      Comment Created!!!
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  props: ["myitem"],
  components: {
    // HelloWorld,
  },
  data() {
    return {
      user: "",
      comment: "",
      commentsArray: [],
      snackbar: false,
    };
  },
  created() {
    this.user = localStorage.getItem("userID");
    this.user = JSON.parse(this.user);
    this.axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${this.myitem.id}/comments`
      )
      .then((res) => {
        this.commentsArray = res.data;
      });
  },
  methods: {
    postthpost() {
      this.snackbar = true;
      this.axios
        .post(
          `https://jsonplaceholder.typicode.com/posts/${this.myitem.id}/comments`,
          {
            comment: this.comment,
            userId: this.user.id,
          }
        )
        .then((res) => {
          this.comment = "";
          this.snackbar = false;
        });
    },
  },
});
</script>
