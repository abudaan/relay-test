import {combineReducers} from 'redux'
import * as actions from '../constants/action_types'

let initialState = {
  selectedId: 25,
  size: 128,
}

function user(state = initialState, action){
  switch(action.type){
    case actions.CHANGE_USER:
      return Object.assign({}, state, {selectedId: action.id})
    case actions.CHANGE_SIZE:
      return Object.assign({}, state, {size: action.size})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user
})

export default rootReducer
