import {takeLatest, put, all, call, } from 'redux-saga/effects';
import { googleProvider, createUserProfileDocument, auth } from '../../firebase/firebase.utils';

import { googleSignInSuccess, googleSignInFailure } from './user.actions';
import UserActionTypes from './user.types';

export function* googleSignInSaga() {
  console.log('googlesignin saga fired')
  try{
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument,user);
    const snapShot = yield userRef.get();
    put(googleSignInSuccess({id: snapShot.id, ...snapShot.data()}));
    console.log(user);
  } catch(err) {
    put(googleSignInFailure(err.message));
  }
}

export function* onGoogleSignInStartSaga() {
  console.log('OnGoogleSignInStart saga fired')
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    googleSignInSaga
  );
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStartSaga)
  ]);
}