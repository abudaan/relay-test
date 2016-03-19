import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'

class ProfilePicture extends Component {

  constructor(props){
    super(props)
    this._imageSizes = [32, 64, 128].map((value) => {
      return <option id={value} key={`image-size-${value}`}>{value}</option>
    })
  }

  render() {
    var user = this.props.user
    //console.log(this.props.relay.variables)
    if(user === null){
      return false
    }

    return (
      <div>
        {`[${user.id}]: ${user.name}`}
        <img src={user.profilePhoto.uri} width={user.profilePhoto.size + 'px'} />
        <select onChange={(e) => this.setSize(e)}>
          {this._imageSizes}
        </select>
      </div>
    );
  }

  setSize(e) {
    let options = e.target.options
    let optionId = options[e.target.selectedIndex].id
    this.props.relay.setVariables({
      size: parseInt(optionId, 10)
    })
  }

  sendMutation(){
    console.log('mutation')
  }
}

export default Relay.createContainer(ProfilePicture, {
  initialVariables: {
    size: 32
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        name,
        profilePhoto(size: $size) {
          uri,
          size
        },
      }
    `,
  },
});
