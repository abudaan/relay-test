import * as actions from '../constants/action_types'
//import pdk from '../util/pdk_wrapper'

export function selectUser(id){
  return (dispatch, getState) => {
    dispatch({
      type: actions.CHANGE_USER,
      id
    })
  }
}

export function setSize(size){
  return (dispatch, getState) => {
    dispatch({
      type: actions.CHANGE_SIZE,
      size
    })
  }
}
