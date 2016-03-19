import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'

class ProfilePicture extends Component {
  render() {
    var user = this.props.user
    //console.log(this.props.relay.variables)
    if(this.props.user === null){
      return false
    }

    return (
      <div>
        {user.id + ': ' + user.name}
        <img src={user.profilePhoto.uri} width={user.profilePhoto.size + 'px'} />
        <button onClick={this.sendMutation}>click me</button>
      </div>
    );
  }

  setSize(photoSize) {
    // TODO: Fetch the profile photo URI for the given size...
  }

  sendMutation(){
    console.log('mutation')
  }
}

export default Relay.createContainer(ProfilePicture, {
  initialVariables: {
    size: 128
  },
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
