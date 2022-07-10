export default function ({ store, route, redirect }) {
  const user = store.getters['user/user'] // Get user from store
  const blockRouteAdmin = /\/admin\/*/g //Regex to find /admin path
  const blockRouteCustomer = /\/customer\/*/g // There can be more paths such as manager
  const path = ['/', '/signup', '/login']
  let value = path.includes(route.path)
  if (user) {
    if (user.isAdmin) {
      //   If user and isAdmin. Redirect to /admin if other path accessed
      if (!route.path.match(blockRouteAdmin)) {
        redirect('/admin')
      }
    } else if (user.isCustomer) {
      //   If user and isAdmin. Redirect to /admin if other path accessed
      if (!route.path.match(blockRouteCustomer)) {
        redirect('/customer')
      }
    }
    // This else part is applicable if there is a user with no role and we just want user to login
    // otherwise this code block can be commented
    else if (
      route.path.match(blockRouteAdmin) ||
      route.path.match(blockRouteCustomer) ||
      value
    ) {
      // If there is a user and its not admin or customer then redirect to root if it matches unwanted paths.
      redirect('/')
    }
  } else {
    //   If not user redirect to home if user page is accessed

    if (
      route.path.match(blockRouteAdmin) ||
      route.path.match(blockRouteCustomer)
    ) {
      redirect('/')
    }
    //   If not user redirect to requested path
    redirect()
  }
}
