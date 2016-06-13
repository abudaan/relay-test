import React, {Component, PropTypes} from 'react'
import Relay, {RootContainer} from 'react-relay'
import User from './user'
import UserSelector from './user_selector'
import {connect} from 'react-redux'
import {setSize, selectUser} from '../actions/'
import UserRoute from '../relay/user_route'


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

const mapStateToProps = function(state){
  const {selectedUserId, profilePictureSize} = state.user
  return {
    selectedUserId,
    profilePictureSize,
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    selectUser: (e) => {
      let options = e.target.options
      let optionId = options[e.target.selectedIndex].id
      //console.log(optionId)
      dispatch(selectUser(optionId))
    },
    selectSize: (e) => {
      let options = e.target.options
      let optionId = parseInt(options[e.target.selectedIndex].id, 10)
      if(optionId !== this.props.profilePictureSize){
        dispatch(setSize(optionId))
      }
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  render() {

    //console.log(this.props)

    let selector = (
      <RootContainer
        Component={UserSelector}
        route={routeUsers}
        renderLoading={() => (<div>{'loading...'}</div>)}
        renderFailure={() => (<div>{'error'}</div>)}
        renderFetched={data =>
          <UserSelector {...data} selectUser={this.props.selectUser} selectedUserId={this.props.selectedUserId} />
        }
        //onReadyStateChange={state => console.log('users', state)}
      />)

    let user = (
      <RootContainer
        Component={User}
        route={new UserRoute({id: this.props.selectedUserId})}
        renderLoading={() => (<div>{'loading...'}</div>)}
        renderFailure={() => (<div>{'error'}</div>)}
        renderFetched={data =>
          <User {...data} selectSize={this.props.selectSize} />
        }
        //onReadyStateChange={state => console.log('user', state)}
      />)

    if(this.props.selectedUserId === 'choose'){
      return (
        <div>
          {selector}
        </div>)
    }

    return (
      <div>
        {selector}
        {user}
      </div>)

  }
}
