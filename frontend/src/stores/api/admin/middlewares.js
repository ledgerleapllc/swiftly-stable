import { toast } from 'react-toastify';
import { all, takeLatest } from 'redux-saga/effects';
import { get, post } from 'shared/core/services/saga';
import { fakeFilterListApi, removeEmptyField } from 'shared/core/utils';
import { types } from 'stores/types';

function* getApplications({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-applications'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getWallets({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-wallets'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getWallet({ payload, resolve, reject }) {
  try {
    const result = yield get(['admin', 'get-wallet'], payload);
    resolve(result);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* getAPIKeys({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-apikeys'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* getAPIKeyHolders({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-apikey-holders'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* getAPIKey({ payload, resolve, reject }) {
  try {
    const { api_key_id, guid } = payload;
    const res = yield get(['admin', 'get-apikey'], { api_key_id, guid });
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* getHistories({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-history'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* approveUser({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'approve-user'], { data: payload });
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* denyUser({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'deny-user'], { data: payload });
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* enableUser({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'enable-user'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast.success(error.message);
    reject(error);
  }
}

function* disableUser({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'disable-user'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast.success(error.message);
    reject(error);
  }
}

function* getIps({ payload, resolve, reject }) {
  try {
    const res = yield get(['admin', 'get-ips'], payload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

function* getAdmins({ payload, resolve, reject }) {
  try {
    const newPayload = removeEmptyField(payload);
    const res = yield get(['admin', 'get-admins'], newPayload);
    /* this code will be remove in the future */
    const result = fakeFilterListApi(res.detail, payload);
    /* end */
    resolve(result);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* createAdmin({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'create-admin'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* resetUserPassword({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'reset-user-password'], { data: payload });
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* disableAPIKey({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'disable-apikey'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* enableAPIKey({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'enable-apikey'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    console.log('error', error);
    toast(error.message);
    reject(error);
  }
}

function* disableIP({ payload, resolve, reject }) {
  try {
    const { ip_id, ip } = payload;
    const res = yield post(['admin', 'disable-ip'], { data: { ip_id } });
    toast.success(`You disabled ${ip}`);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* createIP({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'create-ip'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* enableIP({ payload, resolve, reject }) {
  try {
    const { ip_id, ip } = payload;
    const res = yield post(['admin', 'enable-ip'], { data: { ip_id } });
    toast.success(`You allowed ${ip}`);
    resolve(res);
  } catch (error) {
    console.log('error', error);
    toast(error.message);
    reject(error);
  }
}

function* getUser({ payload, resolve, reject }) {
  try {
    const res = yield get(['admin', 'get-user'], payload);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* getUsers({ payload, resolve, reject }) {
  try {
    const res = yield get(['admin', 'get-users'], payload);
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

export function* watchAdmin() {
  yield all([
    takeLatest(types.GET_APPLICATIONS, getApplications),
    takeLatest(types.GET_API_KEYS, getAPIKeys),
    takeLatest(types.GET_API_KEY, getAPIKey),
    takeLatest(types.GET_API_KEY_HOLDERS, getAPIKeyHolders),
    takeLatest(types.GET_WALLETS, getWallets),
    takeLatest(types.GET_WALLET, getWallet),
    takeLatest(types.GET_HISTORIES, getHistories),
    takeLatest(types.GET_WHITE_LISTED_IPS, getIps),
    takeLatest(types.GET_ADMINS, getAdmins),
    takeLatest(types.CREATE_ADMIN, createAdmin),
    takeLatest(types.APPROVE_USER, approveUser),
    takeLatest(types.DENY_USER, denyUser),
    takeLatest(types.RESET_USER_PASSWORD, resetUserPassword),
    takeLatest(types.DISABLE_API_KEY, disableAPIKey),
    takeLatest(types.ENABLE_API_KEY, enableAPIKey),

    takeLatest(types.DISABLE_IP, disableIP),
    takeLatest(types.ENABLE_IP, enableIP),
    takeLatest(types.CREATE_IP, createIP),

    takeLatest(types.GET_USER, getUser),
    takeLatest(types.GET_USERS, getUsers),
    takeLatest(types.DISABLE_USER, disableUser),
    takeLatest(types.ENABLE_USER, enableUser),
  ]);
}
