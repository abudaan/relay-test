import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'

class ProfilePicture extends Component {
  render() {
    // Expects the `user` prop to have the following shape:
    // {
    //   profilePhoto: {
    //     uri,
    //     size
    //   }
    // }
    var user = this.props.user;
    // return (
    //   <View>
    //     <Image uri={user.profilePhoto.uri} width={...} />
    //     <Slider onChange={value => this.setSize(value)} />
    //   </View>
    // );
    console.log(user)
    return (
      <div>{'aap' + user.id}</div>
    );
  }

  // Update the size of the photo
  setSize(photoSize) {
    // TODO: Fetch the profile photo URI for the given size...
  }
}


// Export a *new* React component that wraps the original `<ProfilePicture>`.
export default Relay.createContainer(ProfilePicture, {
  // Specify the initial value of the `$size` variable.
  initialVariables: {
    size: 32
  },
  // For each of the props that depend on server data, we define a corresponding
  // key in `fragments`. Here, the component expects server data to populate the
  // `user` prop, so we'll specify the fragment from above as `fragments.user`.
  // fragments: {
  //   user: () => Relay.QL`
  //     fragment on User {
  //       profilePhoto(size: $size) {
  //         uri,
  //       },
  //     }
  //   `,
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        profilePhoto(size: $size) {
          uri,
          size
        },
      }
    `,
  },
});
