import React, {Component, PropTypes} from 'react'
import Relay, {RootContainer} from 'react-relay'
import User from './user'
import UserSelector from './user_selector'
import {connect} from 'react-redux'
import {selectUser} from '../actions/'


const routeUsers = {
  name: 'Users',
  params: {},
  queries: {
    users: () => Relay.QL`
      query {
        users
      }`
  },
}

const routeProfilePicture = {
  name: 'ProfilePictureRoute',
  params: {
    size: {required: true},
    userid: {required: true}
  },
  queries: {
    user: () => Relay.QL`
      query {
        user(userid: $userid, size: $size)
      }`
  }
}

const mapStateToProps = function(state){
  const {selectedId} = state.user
  return {
    selectedId,
    selectUser,
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    selectUser: (e) => {
      let options = e.target.options
      let optionId = options[e.target.selectedIndex].id
      dispatch(selectUser(optionId))
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  render() {
    return (
      <div>
        <RootContainer
          Component={UserSelector}
          route={routeUsers}
          renderLoading={() => (<div>{'loading...'}</div>)}
          renderFailure={() => (<div>{'error'}</div>)}
          renderFetched={data =>
            <UserSelector {...data} selectUser={this.props.selectUser} selectedId={this.props.selectedId} />
          }
          //onReadyStateChange={state => console.log('users', state)}
        />

        <RootContainer
          Component={User}
          route={routeProfilePicture}
          renderLoading={() => (<div>{'loading...'}</div>)}
          renderFailure={() => (<div>{'error'}</div>)}
          //onReadyStateChange={state => console.log('users', state)}
        />
      </div>
    );
  }
}
