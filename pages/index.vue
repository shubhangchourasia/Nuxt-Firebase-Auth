<template>
  <div class="main">
    <h1 class="h1">
      <span style="color: #01c58e">Nuxt</span>
      <span style="color: #ffa000">Firebase</span> Auth
    </h1>
    <div class="mt-5">
      <b-button
        type="is-primary mx-4"
        tag="router-link"
        to="/login"
        outlined
        v-if="!user"
        >Login</b-button
      >
      <b-button
        type="is-success mx-4"
        tag="router-link"
        to="/signup"
        outlined
        v-if="!user"
        >Signup</b-button
      >
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['user']),
  },
}
</script>
<style scoped>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.h1 {
  font-size: 40px;
  font-family: sans-serif;
}
</style>
