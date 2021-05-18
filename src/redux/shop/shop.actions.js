import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
  type : ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSucces = collectionsMap => ({
  type : ShopActionTypes.fetchCollectionsSucces,
  payload : collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
  type : ShopActionTypes.fetchCollectionsSucces,
  payload : errorMessage
})

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionsRef = firestore.collection('collections');

    dispatch(fetchCollectionsStart());

    collectionsRef.get().then(snapShot => {
      const collectionsArray = convertCollectionsSnapShotToMap(snapShot);
      dispatch(fetchCollectionsSucces(collectionsArray))
    }).catch(err => dispatch(fetchCollectionsFailure(err.message)))
  }
}
