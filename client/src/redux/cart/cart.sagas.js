import { takeLatest, all, call, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartSaga() {
  yield put(clearCart())
}

export function* clearCartOnSignOutSaga(){
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS,clearCartSaga)
}

export function* cartSagas() {
  yield all([
    call(clearCartOnSignOutSaga)
  ])
}