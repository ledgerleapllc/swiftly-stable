import { generateAPIAction } from 'shared/core/services/redux';
import { types } from 'stores/types';

export const getUserAPIKey = generateAPIAction(types.GET_USER_API_KEY);
export const getUserHistory = generateAPIAction(types.GET_USER_HISTORY);
export const getUserWallet = generateAPIAction(types.GET_USER_WALLET);
export const getUserUsage = generateAPIAction(types.GET_USER_USAGE);
export const getUserApiKeys = generateAPIAction(types.GET_USER_API_KEYS);
export const getUserWallets = generateAPIAction(types.GET_USER_WALLETS);
