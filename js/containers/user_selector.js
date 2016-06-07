import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'
import {selectUser} from '../actions/'
import {connect} from 'react-redux'


const mapStateToProps = function(state){
  const {selectedId} = state.user
  return {
    selectedId
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    selectUser: (e) => {
      let options = e.target.options
      let optionId = parseInt(options[e.target.selectedIndex].id, 10)
      if(optionId !== 'choose'){
        dispatch(selectUser(optionId))
      }else{
        //dispatch(selectUser())
      }
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class UserSelector extends Component {
  render() {
    //console.log(this.props)
    let users = this.props.users.users
    let options = [<option id={'choose'} key={'choose'}>{'select a user'}</option>]
    users.map((user) => {
      //console.log(user.userId, this.props.selectedId)
      options.push(<option id={user.userId} key={user.userId} disabled={user.userId === this.props.selectedId}>{user.name}</option>)
    })
    return (
      <select
        onChange={this.props.selectUser}
        //defaultValue={options[0]}
      >
        {options}
      </select>
    )
  }

  static propTypes = {
    selectedId: PropTypes.number,
  }
}


export default Relay.createContainer(UserSelector, {
  fragments: {
    users: () => Relay.QL`
      fragment on Users {
        users {
          userId,
          name
        }
      }
    `
  }
})
