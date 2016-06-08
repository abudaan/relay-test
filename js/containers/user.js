import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'
import {connect} from 'react-redux'
import {setSize} from '../actions/'
import ProfilePicture from './profile_picture/'


const mapStateToProps = function(state){
  const {size} = state.user
  return {
    size
  }
}

@connect(mapStateToProps)
class User extends Component {

  constructor(props){
    super(props)
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        <span>{'hello, I am ' + this.props.user.name}</span>
      </div>
    )
  }
        // <ProfilePicture size={this.props.size} />
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        ${ProfilePicture.getFragment('user')}
      }
    `,
  },
})

