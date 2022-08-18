import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userData: {}
    posts: []
  },
  mutations: {
    ADD_USER_POSTS: (state, data) => {
      state.posts.push(data)
    }
  }
})