import ShopActionTypes from './shop.types';

import { 
  firestore, 
  convertCollectionsSnapShotToMap 
} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type : ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSucces = collectionsMap => ({
  type : ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload : collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type : ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload : errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionsRef = firestore.collection('collections');
    console.log('fetch collections start finished successfully');
    dispatch(fetchCollectionsStart());
    collectionsRef
      .get()
      .then(snapShot => {
      const collectionsArray = convertCollectionsSnapShotToMap(snapShot);
      console.log('calling fetch collections success');

      dispatch(fetchCollectionsSucces(collectionsArray));
      console.log('fetch collections success finished successfully');

    }).catch(err => dispatch(fetchCollectionsFailure(err.message)))
  }
}
  