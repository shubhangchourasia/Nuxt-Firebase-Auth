const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

//For setting new user Custom Claims
exports.customClaims = functions.https.onCall(async (data, ctx) => {
  try {
    await admin.auth().setCustomUserClaims(data.uid, data.role)
  } catch (error) {
    console.log(error)
  }
})
