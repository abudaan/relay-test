import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'

class UserSelector extends Component {

  static propTypes = {
    selectedId: PropTypes.string,
  }

  render() {

    //console.log(this.props)
    let users = this.props.users.users
    let options = [<option id={'choose'} key={'choose'}>{'select a user'}</option>]
    users.map((user) => {
      options.push(<option id={user.id} key={user.id} disabled={user.id === this.props.selectedUserId}>{user.name}</option>)
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
