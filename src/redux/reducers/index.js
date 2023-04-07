import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import authReducers from './authReducers'
import productReducers from './productReducers'
import userReducers from './userReducers'
import companyReducers from './companyReducers'
import masterReducers from './masterReducers'
import postReducers from './postReducers'
import mediaReducers from './mediaReducers'
import promotionReducers from './promotionReducers'
import subscriptionReducers from './subscriptionReducers'
const appReducer = combineReducers({
  routerState: routerReducer,
  authState: authReducers,
  productState: productReducers,
  userState: userReducers,
  companyState: companyReducers,
  masterState: masterReducers,
  postState: postReducers,
  mediaState: mediaReducers,
  promotionState: promotionReducers,
  subscriptionState: subscriptionReducers,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_SIGN_OUT_SUCCESS') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}
export default rootReducer
