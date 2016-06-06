import Relay from 'react-relay'

export default class UserSelectorRoute extends Relay.Route {
  static queries = {
    users: () => Relay.QL`
      query {
        users
      }
    `
  }

  static routeName = 'UserSelectorRoute';
}
