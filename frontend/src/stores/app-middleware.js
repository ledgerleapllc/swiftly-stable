import { all } from 'redux-saga/effects';
import { watchAdmin } from './api/admin/middlewares';
import { watchShared } from './api/shared/middlewares';
import { watchAuth } from './auth/middlewares';
import { watchUser } from './api/user/middlewares';

export default function* appMiddleware() {
  yield all([
    watchAuth(),
    watchAdmin(),
    watchUser(),
    watchShared()
  ]);
}
