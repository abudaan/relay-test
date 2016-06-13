import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'
import ProfilePicture from './profile_picture/'


class User extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <span>{'hello, I am ' + this.props.user.name}</span>
        <ProfilePicture setSize={this.props.setSize}/>
      </div>
    )
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        ${ProfilePicture.getFragment('user')},
      }
    `,
  },
})

