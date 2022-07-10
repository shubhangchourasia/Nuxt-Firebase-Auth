<template>
  <div class="main">
    <form class="box" @submit.prevent="login">
      <b-field label="Email">
        <b-input
          type="email"
          placeholder="john@example.com"
          v-model="loginDetails['email']"
          :disabled="disabled"
        >
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          type="password"
          placeholder="*********"
          password-reveal
          v-model="loginDetails['password']"
          :disabled="disabled"
        >
        </b-input>
      </b-field>

      <b-button
        type="is-primary mt-5"
        native-type="submit"
        expanded
        :loading="disabled"
        >Login</b-button
      >
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { mapActions, mapState } from 'vuex'
export default {
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login',
        },
      ],
    }
  },
  data() {
    return {
      loginDetails: {
        email: '',
        password: '',
      },
      disabled: false,
    }
  },
  computed: {
    ...mapState('user', ['user']),
    authComplete() {
      return this.user
    },
  },
  watch: {
    authComplete() {
      window.location.reload()
    },
  },
  methods: {
    ...mapActions('user', ['userlogin']),
    async login() {
      this.disabled = true
      const auth = getAuth()
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          this.loginDetails.email,
          this.loginDetails.password
        )
        if (user.emailVerified) {
          let { claims } = await user.getIdTokenResult()
          this.userlogin({ ...user, ...claims })
        } else {
          this.launchToast(
            'Please verify your email with the link sent to your email.',
            'is-warning'
          )
          this.disabled = false
        }
      } catch (error) {
        this.disabled = false
        if (error.code == 'auth/invalid-email') {
          this.launchToast('Invalid email address.', 'is-warning')
        } else if (error.code == 'auth/user-not-found') {
          this.launchToast('User not found.', 'is-danger')
        } else if (error.code == 'auth/wrong-password') {
          this.launchToast('Password is incorrect.', 'is-warning')
        } else if (error.code == 'auth/network-request-failed') {
          this.launchToast('Check network connection.', 'is-warning')
        } else if (error.code == 'auth/user-disabled') {
          this.launchToast(
            'The user account has been temporarily disabled by an administrator.',
            'is-warning'
          )
        } else {
          this.launchToast('An error occured. Please try again', 'is-danger')
        }
      }
    },
    launchToast(msg, color, duration = 4000) {
      this.$buefy.toast.open({
        duration: duration,
        message: msg,
        type: color,
      })
    },
  },
}
</script>

<style scoped>
.main {
  height: 100vh;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}
.box {
  width: 350px;
}
</style>
