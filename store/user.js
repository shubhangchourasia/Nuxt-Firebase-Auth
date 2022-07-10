import { auth } from '../plugins/firebaseConfig'
import Cookies from 'js-cookie'

export const state = () => ({
  // Initial user state is null
  user: null,
})

export const getters = {
  user(state) {
    return state.user
  },
}

export const actions = {
  async userlogin({ dispatch }, user) {
    try {
      const token = await auth.currentUser.getIdToken(true)
      const userInfo = {
        email: user.email,
        isAdmin: user.admin,
        isCustomer: user.customer,
        uid: user.uid,
        name: user.displayName,
      }
      // Set token my_access_token. Token name can be anything
      Cookies.set('my_access_token', token)
      await dispatch('setUSER', userInfo)
    } catch (err) {
      console.log(err)
    }
  },

  setUSER({ commit }, user) {
    commit('setUSER', user)
  },
}

export const mutations = {
  setUSER(state, user) {
    state.user = user
  },
}
