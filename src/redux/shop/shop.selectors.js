import { createSelector } from 'reselect';  

const shopSelector = state => state.shop;

export const shopCollectionsSelector = createSelector(
  [shopSelector],
  (shop) => shop.collections
)

export const selectCollection = collectionUrlParam => createSelector(
  [shopCollectionsSelector],
  (collections) => collections[collectionUrlParam]
)