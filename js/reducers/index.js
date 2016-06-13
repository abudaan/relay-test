import {combineReducers} from 'redux'
import * as actions from '../constants/action_types'

let initialState = {
  selectedUserId: 'choose',
  profilePictureSize: 128,
}

function user(state = initialState, action){
  switch(action.type){
    case actions.CHANGE_USER:
      return {...state, selectedUserId: action.id}
    case actions.CHANGE_SIZE:
      return {...state, profilePictureSize: action.size}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user
})

export default rootReducer
