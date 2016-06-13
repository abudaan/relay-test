import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'

class ProfilePicture extends Component {

  constructor(props){
    super(props)

    this._imageSizes = [32, 64, 128].map((value) => {
      return <option id={value} key={`image-size-${value}`} disabled={value === this.props.size}>{value}</option>
    })
  }

  render() {
    return (
      <div>
        <img src={this.props.user.profilePhoto.uri} width={this.props.relay.variables.size + 'px'} />
        <select onChange={e => this.props.selectSize(e)}>
          {this._imageSizes}
        </select>
      </div>
    );
  }

  sendMutation(){
    console.log('mutation')
  }
}

export default Relay.createContainer(ProfilePicture, {
  initialVariables: {
    size: 128
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        profilePicture(size: $size){
          uri
        }
      }
    `,
  },
})
