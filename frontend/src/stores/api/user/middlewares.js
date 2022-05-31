import { all, takeLatest } from 'redux-saga/effects';
import { get } from 'shared/core/services/saga';
import { fakeFilterListApi } from 'shared/core/utils';
import { types } from 'stores/types';

function* getUserAPIKey({ payload, resolve, reject }) {
  try {
    const res = yield get(['user', 'get-apikey']);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* getUserAPIKeys({ payload, resolve, reject }) {
  try {
    const res = yield get(['user', 'get-apikeys']);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getUserWallet({ payload, resolve, reject }) {
  try {
    const res = yield get(['user', 'get-wallet']);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* getUserWallets({ payload, resolve, reject }) {
  try {
    const res = yield get(['user', 'get-wallets']);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getUserHistory({ payload, resolve, reject }) {
  try {
    const res = yield get(['user', 'get-history']);
    /* this code will be remove in the future */
    let result = fakeFilterListApi(res.detail, payload);
    if (payload.only_delivered) {
      result.items = result.items.filter(x => +x.fulfilled === 1 && +x.success === 1);
    }
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getUserUsage({ payload, resolve, reject }) {
  try {
    const res = yield get(['user', 'usage']);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

export function* watchUser() {
  yield all([
    takeLatest(types.GET_USER_API_KEY, getUserAPIKey),
    takeLatest(types.GET_USER_WALLET, getUserWallet),
    takeLatest(types.GET_USER_API_KEYS, getUserAPIKeys),
    takeLatest(types.GET_USER_WALLETS, getUserWallets),
    takeLatest(types.GET_USER_HISTORY, getUserHistory),
    takeLatest(types.GET_USER_USAGE, getUserUsage),
  ]);
}
