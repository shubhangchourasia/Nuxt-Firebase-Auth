<template>
  <b-navbar shadow fixed-top class="p-4">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h1 class="h1">
          <span style="color: #01c58e">Nuxt</span>
          <span style="color: #ffa000">Firebase</span> Auth
        </h1>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="/"> Home </b-navbar-item>
      <b-navbar-item href="/admin/dashboard" v-if="user && user.isAdmin">
        Dashboard
      </b-navbar-item>
      <b-navbar-item href="/customer/order" v-if="user && user.isCustomer">
        Order
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <b-button
          type="is-primary mx-2"
          tag="router-link"
          to="/login"
          outlined
          v-if="!user"
          >Login</b-button
        >
        <b-button
          type="is-success mx-2"
          tag="router-link"
          to="/signup"
          outlined
          v-if="!user"
          >Signup</b-button
        >
        <b-button @click="logout" class="logout" v-if="user"> Logout </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { getAuth, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    logout() {
      const auth = getAuth()
      signOut(auth)
        .then(async () => {
          try {
            Cookies.remove('my_access_token')
          } catch (error) {
            console.error('error', error)
          } finally {
            window.location.reload()
          }

          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          console.log('error', error)
        })
    },
  },
}
</script>
<style scoped>
.h1 {
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 1px;
}
</style>
