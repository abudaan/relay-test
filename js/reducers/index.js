import {combineReducers} from 'redux'
import * as actions from '../constants/action_types'

function user(state = {selectedId: '25'}, action){
  switch(action.type){
    case actions.CHANGE_USER:
      return Object.assign({}, state, {selectedId: action.userId})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user
})

export default rootReducer
