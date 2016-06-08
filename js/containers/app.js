import React, {Component, PropTypes} from 'react'
import Relay, {RootContainer} from 'react-relay'
import User from './user'
import ProfileRoute from '../relay/profile_route'
import UserSelector from './user_selector'
import UsersRoute from '../relay/users_route'
import {connect} from 'react-redux'


const mapStateToProps = function(state){
  const {selectedId} = state.user
  return {
    selectedId
  }
}

@connect(mapStateToProps)
export default class App extends Component {
  render() {
    //console.log(this.props.selectedId)
    return (
      <div>
        <RootContainer
          Component={User}
          route={new ProfileRoute({userID: this.props.selectedId})}
          renderLoading={() => (<div>{'loading...'}</div>)}
          renderFailure={() => (<div>{'error'}</div>)}
          onReadyStateChange={state => console.log('profile', state)}
        />

        <RootContainer
          Component={UserSelector}
          route={new UsersRoute()}
          renderLoading={() => (<div>{'loading...'}</div>)}
          renderFailure={() => (<div>{'error'}</div>)}
          onReadyStateChange={state => console.log('users', state)}
        />
      </div>
    );
  }
}
