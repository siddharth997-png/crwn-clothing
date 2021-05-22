import { takeLatest, call, put } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

import { 
  firestore, 
  convertCollectionsSnapShotToMap 
} from '../../firebase/firebase.utils';

import {
  fetchCollectionsSucces,
  fetchCollectionsFailure
} from './shop.actions';

function* fetchCollectionsAsyncSaga(){
    try{
      const collectionsRef = firestore.collection('collections');
      const snapShop = yield collectionsRef.get();
      const collectionsMap = yield call(convertCollectionsSnapShotToMap,snapShop);
       yield put(fetchCollectionsSucces(collectionsMap));
    } catch(err) {
      yield put(fetchCollectionsFailure(err.message));
    }
}

export function* fetchCollectionsStartSaga(){
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsyncSaga)
}