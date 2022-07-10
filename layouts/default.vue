<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
export default {
  computed: {
    ...mapState('user', ['user']),
  },
  created() {
    if (Cookies.get('my_access_token') && !this.user) {
      window.location.reload()
    }
  },
  watch: {
    $route() {
      if (Cookies.get('my_access_token') && !this.user) {
        window.location.reload()
      }
    },
  },
  middleware: ['auth'],
}
</script>
