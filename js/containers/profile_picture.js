import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'
import {connect} from 'react-redux'
import {setSize} from '../actions/'


const mapStateToProps = function(state){
  const {size} = state.size
  return {
    size
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    selectSize: (e) => {
      let options = e.target.options
      let optionId = parseInt(options[e.target.selectedIndex].id, 10)
      if(optionId !== 'choose'){
        dispatch(setSize(optionId))
      }else{
        //dispatch(selectUser())
      }
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class ProfilePicture extends Component {

  constructor(props){
    super(props)
    this._imageSizes = [32, 64, 128].map((value) => {
      return <option id={value} key={`image-size-${value}`} disabled={value === this.props.size}>{value}</option>
    })

  }

  render() {
    var user = this.props.user
    //console.log(this.props)
    //console.log(this.props.relay.variables)
    if(user === null){
      return false
    }

    if(typeof user.profilePhoto === 'undefined'){
      return false
    }

    // return (
    //   {`[${user.id}]: ${user.name}`}
    //   <div>
    //     <img src={user.profilePhoto.uri} width={user.profilePhoto.size + 'px'} />
    //     <select onChange={(e) => this.setSize(e)}>
    //       {this._imageSizes}
    //     </select>
    //   </div>
    // );

    return (
      <div>
        <img src={user.profilePhoto.uri} width={this.props.relay.variables.size + 'px'} />
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
      size: parseInt(optionId, 10) // -> yields Error: Unknown type "ID".,Error: Cannot query field "node" on type "Query".
    })
  }

  sendMutation(){
    console.log('mutation')
  }
}

export default Relay.createContainer(ProfilePicture, {
  initialVariables: {
    size: 44
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        profilePhoto(size: $size){
          uri
        }
      }
    `,

  },
})

/*
export default Relay.createContainer(ProfilePicture, {
  initialVariables: {
    size: 128
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        profilePhoto(size: $size){
          uri
        }
      }
    `,
    // user: () => Relay.QL`
    //   fragment on User {
    //     profilePhoto(size: $size) {
    //       uri,
    //     },
    //   }
    // `,
    // user: () => Relay.QL`
    //   fragment on User {
    //     id,
    //     name,
    //     profilePhoto(size: $size) {
    //       uri,
    //       size
    //     },
    //   }
    // `,
  },
});
*/