import * as actions from '../constants/action_types'
//import pdk from '../util/pdk_wrapper'

export function selectUser(userId){
  return (dispatch, getState) => {
    dispatch({
      type: actions.CHANGE_USER,
      userId
    })
  }
}
