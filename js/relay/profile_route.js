import Relay, {Route} from 'react-relay'

export default class ProfileRoute extends Relay.Route {
  static queries = {
    user: () => Relay.QL`
      query { user(id: $userID) }
    `,
  };
  static paramDefinitions = {
    // By setting `required` to true, `ProfileRoute` will throw if a `userID`
    // is not supplied when instantiated.
    userID: {required: true},
  };
  static routeName = 'ProfileRoute';
}
