import {takeLatest, put, all, call, } from 'redux-saga/effects';
import { googleProvider, createUserProfileDocument, auth } from '../../firebase/firebase.utils';

import { 
  signInSuccess, 
  signInFailure,
} from './user.actions';

import UserActionTypes from './user.types';

export function* getSnapshotFromUser(userAuth){
   try{ 
    const userRef = yield call(createUserProfileDocument,userAuth);
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
  console.log('onEmailSignInStartSaga : ');
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,emailSignInSaga)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStartSaga),
    call(onEmailSignInStartSaga)
  ]);
}