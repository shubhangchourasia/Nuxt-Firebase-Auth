import JwtDecode from 'jwt-decode'
var cookieparser = require('cookieparser')

export function getUserFromCookie(req) {
  // Check if process is server and check for cookies
  if (process.server && req.headers.cookie) {
    //   Parse the coookies
    const parsed = cookieparser.parse(req.headers.cookie)
    //   my_access_token is the token we are setting in /store/user.js File. The name can be anything
    const accessTokenCookie = parsed.my_access_token
    if (!accessTokenCookie) return
    // If token not found return and exit function
    const decodedToken = JwtDecode(accessTokenCookie)
    if (!decodedToken) return
    // if token found return decodedToken
    return decodedToken
  }
}
