import { getUserFromCookie } from '../helper/index.js'

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    try {
      const user = getUserFromCookie(req)
      // if user found in Cookies. Dispatch and store the user in store.
      if (user) {
        await dispatch('user/setUSER', {
          email: user.email,
          isAdmin: user.admin,
          isCustomer: user.customer,
          uid: user.user_id,
          name: user.name,
        })
      }
    } catch (err) {
      console.log(err)
    }
  },
}
