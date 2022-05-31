import { generateAPIAction } from 'shared/core/services/redux';
import { types } from 'stores/types';

export const signUp = generateAPIAction(types.SIGN_UP);
export const login = generateAPIAction(types.LOGIN);
export const logout = generateAPIAction(types.LOGOUT);
export const sendLoginMail = generateAPIAction(types.SEND_LOGIN_MAIL);
export const resetPassword = generateAPIAction(types.RESET_PASSWORD);
export const forgotPassword = generateAPIAction(types.FORGOT_PASSWORD);
export const verifyCode = generateAPIAction(types.VERIFY_CODE);
export const confirmRegistration = generateAPIAction(types.CONFIRM_REGISTRATION);
export const fetchUserInfo = generateAPIAction(types.FETCH_USER_INFO);
export const confirmMFA = generateAPIAction(types.CONFIRM_MFA);

export const setUser = (payload) => ({
  type: types.SET_USER,
  payload,
});

export const updateUser = (payload) => ({
  type: types.UPDATE_USER,
  payload,
});

export const clearUser = () => ({
  type: types.CLEAR_USER,
});
