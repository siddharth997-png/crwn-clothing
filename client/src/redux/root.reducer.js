import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const rootReducer = combineReducers({
  user : userReducer,
  cart : cartReducer,
  shop : shopReducer,
  directory : directoryReducer
}); 
 
export default rootReducer;