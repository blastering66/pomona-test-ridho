import { StackActions, NavigationActions } from 'react-navigation'

class AppNavigationActions {
  makeNested (navigate, items, params) {
    for (let i = 0; i < items.length; i++) {
      navigate.routeName = items[i]
      navigate.params = params
      items.shift()
      if (items.length > 0) {
        navigate.action = {}
        this.makeNested(navigate.action, items, params)
      }
      break
    }
    return navigate
  }

  makeNavigationActionsFromNested (navigate) {
    if (navigate.action) {
      this.makeNavigationActionsFromNested(navigate.action)
      navigate.action = Object.assign(navigate.action, NavigationActions.navigate(navigate.action))
    }
  }
  goToReset (to, params) {
    if (typeof to === 'string') {
      to = [to]
    }
    let navigate = {}
    navigate = this.makeNested(navigate, to, params)
    this.makeNavigationActionsFromNested(navigate)
    return StackActions.reset({
      index: 0,
      key: null,
      actions: [navigate],
    })
  }

  goToStackDetails(nav, screenName, params) {
    nav.navigate(
      NavigationActions.navigate({
        routeName: 'Detail',
        action: NavigationActions.navigate({
          routeName: screenName, params: params
        })
      })
    )
  }

  goToStackOther(nav, stackName, screenName, params) {
    nav.navigate(
      NavigationActions.navigate({
        routeName: stackName,
        action: NavigationActions.navigate({
          routeName: screenName, params: params
        })
      })
    )
  }
}

export default new AppNavigationActions()
