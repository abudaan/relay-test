import React, {Component, PropTypes} from 'react'
import Relay, {RootContainer} from 'react-relay'
import ProfilePicture from './profile_picture'
import ProfileRoute from '../relay/profile_route'
import UserSelector from './user_selector'
import UserSelectorRoute from '../relay/user_selector_route'
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
          Component={ProfilePicture}
          route={new ProfileRoute({userID: this.props.selectedId})}
          renderLoading={() => (<div>{'loading...'}</div>)}
          renderFailure={() => (<div>{'error'}</div>)}
          onReadyStateChange={state => console.log('profile', state)}
        />
        <RootContainer
          Component={UserSelector}
          route={new UserSelectorRoute()}
          renderLoading={() => (<div>{'loading...'}</div>)}
          renderFailure={() => (<div>{'error'}</div>)}
          onReadyStateChange={state => console.log('user', state)}
        />
      </div>
    );
  }
}
