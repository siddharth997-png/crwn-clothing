import {takeLatest, put, all, call, takeEvery, } from 'redux-saga/effects';
import { 
  auth,
  googleProvider, 
  createUserProfileDocument, 
  getCurrentUser 
} from '../../firebase/firebase.utils';

import { 
  signInSuccess, 
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from './user.actions';

import UserActionTypes from './user.types';

export function* getSnapshotFromUser(userAuth,additionalData){
   try{ 
    const userRef = yield call(createUserProfileDocument,userAuth,additionalData);
    const snapShot = yield userRef.get();
     yield put(signInSuccess({
      id: snapShot.id,
      ...snapShot.data()
    }));
  } catch(err) {
    yield put(signInFailure(err.message));
  }
}

export function* googleSignInSaga() {
  try{
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUser(user);
  } catch(err) {
    yield put(signInFailure(err.message));
  }
}

export function* onGoogleSignInStartSaga() {
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    googleSignInSaga
  );
}

export function* emailSignInSaga({payload:{email, password}}){
  try{
    const {user} = yield auth.signInWithEmailAndPassword(email,password);
     yield getSnapshotFromUser(user);

  } catch(err) {
    yield put(signInFailure(err.message));
  }
}

export function* onEmailSignInStartSaga(){
  yield takeLatest(
    UserActionTypes.EMAIL_SIGN_IN_START,
    emailSignInSaga
  );
}

export function* isUserAunthenticated(){
  try{
    const userAuth = yield getCurrentUser();
    if(!userAuth) {
      return;
    }
    yield getSnapshotFromUser(userAuth)
  }catch(err) {
    put(signInFailure(err))
  } 
}

export function* onCheckUserSessionSaga(){
  yield takeEvery(
    UserActionTypes.CHECK_USER_SESSION,
    isUserAunthenticated
  );
}

export function* signOut(){
  try{
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch(err) {
    yield put(signOutFailure(err))
  }
}

export function* onSignOutSaga(){
  yield takeEvery(
    UserActionTypes.SIGN_OUT_START,
    signOut
  );
}

export function* signUpSaga({payload:{email, password,displayName}}) {
  try{
    const {user} = yield auth.createUserWithEmailAndPassword(email,password);
    yield getSnapshotFromUser(user,{displayName})
  } catch(err) {
    console.log(err)
  }
}

export function* onSignUpSaga(){
  yield takeEvery(
    UserActionTypes.SIGN_UP_START,
    signUpSaga
  )
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStartSaga),
    call(onEmailSignInStartSaga),
    call(onCheckUserSessionSaga),
    call(onSignOutSaga),
    call(onSignUpSaga)
  ]);
}