import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'
import {selectUser} from '../actions/'
import {connect} from 'react-redux'


const mapStateToProps = function(state){
  const {userId} = state
  return {
    userId
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    selectUser: (e) => {
      let options = e.target.options
      let optionId = options[e.target.selectedIndex].id
      if(optionId !== 'choose'){
        dispatch(selectUser(optionId))
      }else{
        dispatch(selectUser())
      }
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class UserSelector extends Component {
  render() {
    let users = this.props.users.users
    let options = []
    users.map((user) => {
      options.push(<option id={user.id} key={user.id}>{user.name}</option>)
    })
    return (
      <select onChange={this.props.selectUser}>
        {options}
      </select>
    )
  }
}

export default Relay.createContainer(UserSelector, {
  fragments: {
    users: () => Relay.QL`
      fragment on Users {
        users {
          id,
          name
        }
      }
    `
  }
})
