import React, {Component, PropTypes} from 'react'
import Relay, {RootContainer} from 'react-relay'
import ProfilePicture from './profile_picture'
import ProfileRoute from '../relay/profile_route'
import UserSelector from './user_selector'
import UserSelectorRoute from '../relay/user_selector_route'
import {connect} from 'react-redux'


const mapStateToProps = function(state){
  const {userId} = state.user
  return {
    userId
  }
}

@connect(mapStateToProps)
export default class App extends Component {
  render() {
    return (
      <div>
        <RootContainer
          Component={ProfilePicture}
          route={new ProfileRoute({userID: this.props.userId || 23})}
          renderLoading={() => (<div>{'loading...'}</div>)}
          renderFailure={() => (<div>{'error'}</div>)}
        />
        <RootContainer
          Component={UserSelector}
          route={new UserSelectorRoute()}
          renderLoading={() => (<div>{'loading...'}</div>)}
          renderFailure={() => (<div>{'error'}</div>)}
        />
      </div>
    );
  }
}
