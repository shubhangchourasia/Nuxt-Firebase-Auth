<template>
  <div class="main">
    <form class="box" @submit.prevent="signup">
      <b-field label="Name">
        <b-input
          type="text"
          placeholder="John Doe"
          v-model="signupDetails['name']"
          required
          :disabled="disabled"
        >
        </b-input>
      </b-field>
      <b-field
        label="Email"
        :message="toggleEmailWarning ? 'Please enter valid email' : ''"
        :type="toggleEmailWarning ? 'is-danger' : ''"
      >
        <b-input
          type="email"
          placeholder="john@example.com"
          v-model="signupDetails['email']"
          required
          @input="checkEmail"
          :disabled="disabled"
        >
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          type="password"
          placeholder="*********"
          password-reveal
          v-model="signupDetails['password']"
          required
          @input="checkPassword"
          @focus="
            togglePasswordConditions = true
            checkPassword()
          "
          :disabled="disabled"
        >
        </b-input>
      </b-field>

      <!-- Password conditions -->
      <div v-show="togglePasswordConditions">
        <p class="passwordValid" ref="eightChar">8 Characters</p>
        <p class="passwordValid" ref="lowerChar">Atleast 1 lowercase</p>
        <p class="passwordValid" ref="upperChar">Atleast 1 uppercase</p>
        <p class="passwordValid" ref="numChar">Atleast 1 number</p>
        <p class="passwordValid" ref="symbol">
          Atleast 1 symbol (!,@,#,$,%,^,&amp;,*)
        </p>
      </div>
      <b-button
        type="is-success mt-5"
        native-type="submit"
        expanded
        :loading="disabled"
        >Signup</b-button
      >
    </form>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
export default {
  head() {
    return {
      title: 'Signup',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Signup',
        },
      ],
    }
  },
  data() {
    return {
      signupDetails: {
        name: '',
        email: '',
        password: '',
      },
      toggleEmailWarning: false, // True when email is not correct
      togglePasswordConditions: false, // Show/Hide password conditions
      isPasswordValid: false,
      isEmailValid: false,
      disabled: false,
    }
  },
  methods: {
    signup() {
      // Check if email and password is not empty
      if (this.signupDetails['email'] && this.signupDetails['password']) {
        // Check if email and password are valid
        if (this.isEmailValid && this.isPasswordValid) {
          this.disabled = true
          this.firebaseSignup()
        } else {
          this.launchToast('Please enter valid email & password.', 'is-warning')
        }
      }
    },
    async firebaseSignup() {
      const auth = getAuth()
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          this.signupDetails.email,
          this.signupDetails.password
        )
        let data = {
          uid: user.uid,
          role: { admin: true },
        }
        // Change the role to {customer:true} or anything else as required
        const customFunc = getFunctions()
        const callable = httpsCallable(customFunc, 'customClaims')
        await callable(data)
        updateProfile(auth.currentUser, {
          displayName: this.signupDetails.name,
        }).catch((error) => {
          console.log('error', error)
          this.launchToast(
            'Error creating account. Please try again.',
            'is-danger'
          )
        })

        sendEmailVerification(auth.currentUser).then(() => {
          this.signupDetails = { name: '', email: '', password: '' }
          this.disabled = false
          this.$buefy.snackbar.open({
            message: 'Check your email for verification link.',
            type: 'is-info',
            position: 'is-top',
            actionText: 'OK',
            indefinite: true,
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    checkPassword() {
      // To check if password is in required pattern
      const eightCharacter = new RegExp('(?=.{8,})').test(
        this.signupDetails['password']
      )
      const lowerCharacter = new RegExp('(?=.*[a-z])').test(
        this.signupDetails['password']
      )
      const upperCharacter = new RegExp('(?=.*[A-Z])').test(
        this.signupDetails['password']
      )
      const numberCharacter = new RegExp('(?=.*[0-9])').test(
        this.signupDetails['password']
      )
      const symbolCharacter = new RegExp('(?=.*[!@#$%^&*])').test(
        this.signupDetails['password']
      )
      // Test 8 Characters
      if (eightCharacter) this.$refs.eightChar.style.color = '#1aeab5'
      else this.$refs.eightChar.style.color = '#f14668'
      // Test lowercase character
      if (lowerCharacter) this.$refs.lowerChar.style.color = '#1aeab5'
      else this.$refs.lowerChar.style.color = '#f14668'
      // Test uppercase character
      if (upperCharacter) this.$refs.upperChar.style.color = '#1aeab5'
      else this.$refs.upperChar.style.color = '#f14668'
      // Test number character
      if (numberCharacter) this.$refs.numChar.style.color = '#1aeab5'
      else this.$refs.numChar.style.color = '#f14668'
      // Test symbol
      if (symbolCharacter) this.$refs.symbol.style.color = '#1aeab5'
      else this.$refs.symbol.style.color = '#f14668'

      if (
        eightCharacter &&
        lowerCharacter &&
        upperCharacter &&
        numberCharacter &&
        symbolCharacter
      ) {
        this.isPasswordValid = true
        this.togglePasswordConditions = false
      } else {
        this.isPasswordValid = false
        this.togglePasswordConditions = true
      }
    },
    checkEmail() {
      // To check if email is in proper format
      this.toggleEmailWarning = true
      let validEmail = new RegExp(
        '([A-za-z0-9._]{1,}@[A-za-z0-9]{1,}[.]{1}[A-za-z]{2,})'
      ).test(this.signupDetails['email'])
      if (validEmail) {
        this.isEmailValid = true
        this.toggleEmailWarning = false
      } else {
        this.isEmailValid = false
        this.toggleEmailWarning = true
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
.passwordValid,
.emailValid {
  font-size: 11px;
  color: #f14668;
}
</style>
