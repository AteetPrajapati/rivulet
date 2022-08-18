<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
  created(){
    this.fetchAPI()
  },
  methods:{
    fetchAPI(){
      this.axios.get("https://jsonplaceholder.typicode.com/todos").then((data)=>{
        console.log(data);
      })
    }
  }
})
</script>
