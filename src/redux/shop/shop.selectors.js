import { createSelector } from 'reselect';  

const shopSelector = state => state.shop;

export const shopCollectionsSelector = createSelector(
  [shopSelector],
  (shop) => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [shopCollectionsSelector],
  (collections) => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam => createSelector(
  [shopCollectionsSelector],
  (collections) => collections[collectionUrlParam]
)