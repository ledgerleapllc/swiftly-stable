import { generateAPIAction } from 'shared/core/services/redux';
import { types } from 'stores/types';

export const getApplications = generateAPIAction(types.GET_APPLICATIONS);
export const getAPIKeys = generateAPIAction(types.GET_API_KEYS);
export const getAPIKey = generateAPIAction(types.GET_API_KEY);
export const getAPIKeyHolders = generateAPIAction(types.GET_API_KEY_HOLDERS);
export const getWallet = generateAPIAction(types.GET_WALLET);
export const getWallets = generateAPIAction(types.GET_WALLETS);
export const getHistories = generateAPIAction(types.GET_HISTORIES);
export const getIps = generateAPIAction(types.GET_WHITE_LISTED_IPS);
export const getAdmins = generateAPIAction(types.GET_ADMINS);
export const createAdmin = generateAPIAction(types.CREATE_ADMIN);
export const resetUserPassword = generateAPIAction(types.RESET_USER_PASSWORD);
export const disableAPIKey = generateAPIAction(types.DISABLE_API_KEY);
export const enableAPIKey = generateAPIAction(types.ENABLE_API_KEY);

export const createIP = generateAPIAction(types.CREATE_IP);
export const disableIP = generateAPIAction(types.DISABLE_IP);
export const enableIP = generateAPIAction(types.ENABLE_IP);

export const disableUser = generateAPIAction(types.DISABLE_USER);
export const enableUser = generateAPIAction(types.ENABLE_USER);

export const getUser = generateAPIAction(types.GET_USER);
export const getUsers = generateAPIAction(types.GET_USERS);
export const approveUser = generateAPIAction(types.APPROVE_USER);
export const denyUser = generateAPIAction(types.DENY_USER);
