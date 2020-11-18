import { takeEvery ,all } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes';
import {logoutSaga,checkAuthTimeoutSaga,authUserSaga,authCheckStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); //listen to action and the execute logoutsaga
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
  
    // yield all([  optionla for above code 
    //  takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    //  takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga), //listen to action and the execute logoutsaga
    //  takeEvery(actionTypes.AUTH_USER, authUserSaga),
    //  takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  
    // ])
  }

  

  export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS , initIngredientsSaga)
  }

