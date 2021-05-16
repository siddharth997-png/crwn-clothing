import ShopActionTypes from './shop.types';

export const updateCollection = collection => ({
  type : ShopActionTypes.UPDATE_COLLECTION,
  payload : collection
})
